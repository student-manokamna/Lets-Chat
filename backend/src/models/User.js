import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

export default User;



/*
🔥 Line:
if (!this.isModified("password")) return next();

🧠 Breakdown:
✅ What does this.isModified("password") check?

It checks:

👉 Has the user changed the password or not?

If password is changed → true

If password is NOT changed → false

❗ Now we add ! (NOT):

!this.isModified("password") means:

👉 password is NOT changed

🔄 Simple Meaning

If password is not changed, then skip hashing and continue saving the user.

🍎 Super Easy Example
Suppose you have a user:
Name: Money
Email: money@gmail.com
Password: 123456


Now you update only the name:

New name → Money Arora
Password → (same)


In this update:

Password is not changed

So there is no need to hash it again

If we try to hash again:

We will be hashing a password that is already hashed

It will break login

So we skip hashing

That's why this line exists.
2️⃣ const salt = await bcrypt.genSalt(10);
What is salt?

Salt = a random string added to your password before hashing

Purpose: Makes password stronger

10 → how strong salt should be (10 rounds)

Example:
"123456" → add salt → "123456%$#KDFDND"

3️⃣ this.password = await bcrypt.hash(this.password, salt);

Takes the user's original password (like "123456")

Mixes it with the salt

Converts it into a hashed, unreadable password

Example:

"123456" → "$2a$10$asdgasdkjasdnasd87as7dasd"


Now no one can read the password. Even you can't reverse it.

4️⃣ next();

This means:
"Password is hashed. Now continue saving the user in the database."

5️⃣ catch(error) { next(error); }

If something goes wrong,

Pass the error to the next middleware,

So your app doesn’t crash.
*/