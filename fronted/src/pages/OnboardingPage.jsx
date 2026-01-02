
import useAuthUser from '../hooks/useAuthUser.js'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { completeOnboarding } from "../lib/api.js";
import { LANGUAGES } from '../constants/INDEX.JS';


//  for more info see it in detaied on hashnode on its page:it is not too detaied 
const OnboardingPage = () => {
    const {authUser} =useAuthUser(); // it is hook
    //  above is taken to validat ki user authenticated hh na: mtlb logged in hh na so we check this in hook where whole aap data stored,=> HOE AS USER SIGNUP FIRST THEN TAHAT DATA STORE HERE MAIN APP NA SO FROM THERE WE TAKE HERE TO CHECK IF SOMEONE IS LOGGED IN OR NOT...
    //  now here we doing updation ki jisne name chnage krna ya extra info daalni hh so put it but yaha ager update rkr rhe hh toh upe vale hook jo ki puri app ka data store kr rha hh usko pta ho ki ha bhai , mere m update ho gya so we ue   const queryClient = useQueryClient();
    const queryClient= useQueryClient();
    //  below is ki ye hamare on boardjing form pe ye sabh ho but humne bola ki intially kuch enpe likha hi hu nam vagara , or vo name konsa hoga jisse user ne authenticate kiya hh , we give that as default
    const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });
  // now for update it : create tanstack whihc i usemuttaion
  const {mutate, isPending}= useMutation({
    mutationFn: completeOnboarding,
    onSuccess:()=>{ // send this to main app.jsz(we store there in hook authuser) where we store this updated info
        //  firstly show on ui using toast as it pop message
          toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
},
onError: (error) => {
      toast.error(error.response.data.message);
    },
  })
//    now as when user click on form submit button at last then taht reuest ccome tothis mutaiona nd process procedd req goes to backeedn and all, but it do not refresh when we click on it so we use :
const handleSubmit = (e) => {
    e.preventDefault();

   mutate(formState);
  };
//    wha happen in short: click on button-> go above at mutate , mutatefn , then go to completeOnboarding, where data is send to backend where backend reposne us with updated data ... then using    queryClient.invalidateQueries updated data stored in app.js hook which then ca acess by any other page also, as auto updation of data occur 

const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };


//    now make ui
  return (
   <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          {/*  AS NOW ALL ARE PART OF FORM BCZ USME CHNAGE HOGE TAB HUM CLIKC KREGE TAB MUTATION HOGA AS ABOVE M TOH KUCH ESA NHI THA  */}
<form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
             {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
              </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                 name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>
      {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default OnboardingPage;