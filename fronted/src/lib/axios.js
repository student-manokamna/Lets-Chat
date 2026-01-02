import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send cookies with the request
});
//  we write this so we do not right againa dnagain full url
/*
Yes! You are 100% correct.

You write this code once so you don't have to repeat the long address every single time you make a request.

Here is the difference:

❌ The Hard Way (Without this file)
If you didn't create this instance, you would have to write the full URL and the cookie setting in every single file:



// You would have to write this LONG line 50 times in your app:
axios.get("http://localhost:5001/api/auth/login", { withCredentials: true });
axios.get("http://localhost:5001/api/auth/signup", { withCredentials: true });
axios.get("http://localhost:5001/api/messages", { withCredentials: true });
✅ The Easy Way (With your code)
Because you created axiosInstance, Axios automatically adds the http://localhost:5001/api and the cookies for you.

2nd way :

// Now you only write the specific part:
axiosInstance.get("/auth/login");
axiosInstance.get("/auth/signup");
axiosInstance.get("/messages");
It actually does TWO jobs for you:
It types the prefix: It auto-fills http://localhost:5001/api.

It carries your ID Card: The line withCredentials: true is super important. It tells Axios: "Whenever you go to the backend, take the browser cookies (the user's session) with you automatically."

Without that line, your backend would say "Who are you?" even if the user is logged in.

*/