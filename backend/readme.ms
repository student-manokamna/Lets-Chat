download-> from package.josn lall dependencies , install npm init --y
in fronted do npm install vite@latest .

i see mongodb using docker na :
in backend :docker pull mongo

docker run -d \
 --name my-mongo \
 -p 27017:27017 \
 -v mongo_data:/data/db \
 mongo

docker ps
npm install mongoose
then creaet a monog url in .env and then set db.js and server.js 
docker exec -it my-mongo mongosh

⭐ WHAT ARE WE DOING? (Easy Explanation)

Tum MongoDB ko direct system me install nahi kar rahe.
Tum MongoDB ko Docker box (container) ke andar chala rahe ho.

Socho:

Docker = Ek dabba (box)

MongoDB = Is dabbe ke andar chalta hua database

Tumhara backend = Is dabbe ke bahar hai, but connect ho sakta hai

⭐ STEP 1 — docker pull mongo
📌 Theory (easy):

Ye command bolta hai:

“Docker, internet se MongoDB ka ready-made version download kar le.”

Yani tum MongoDB ki image download kar rahe ho.

🖥 Practical:
docker pull mongo

⭐ STEP 2 — docker run … mongo

Ye sabse important step hai.

📌 Theory (easy):

Ye command:

MongoDB ko chalata hai Docker ke andar

Container ko name deta hai → my-mongo

Tumhare computer se MongoDB ko connect karta hai

Data ko save karta hai (taaki container band ho to data na ude)

Think like:

Tumne ek MongoDB ka box bana diya, jo background me chal raha hai.

🖥 Practical:
docker run -d \
 --name my-mongo \
 -p 27017:27017 \
 -v mongo_data:/data/db \
 mongo

📌 Breakdown (super simple):
Part	Meaning
docker run -d	Background me run karo
--name my-mongo	Container ka naam my-mongo rakho
-p 27017:27017	PC port 27017 → container port 27017
-v mongo_data:/data/db	Data save karo taaki delete na ho
mongo	Use mongo image from Docker
⭐ STEP 3 — docker ps
📌 Theory:

Ye batata hai ki abhi Docker ke andar kaun kaun se containers chal rahe hain.

🖥 Practical:
docker ps


Agar my-mongo dikh gaya → MongoDB running successfully!

⭐ STEP 4 — Install mongoose

Ye tumhare backend ko MongoDB se connect karta hai.

🖥 Practical:
npm install mongoose

⭐ STEP 5 — Create .env file

.env file me tum MongoDB ka connection URL likhte ho.

📌 Theory:

Backend ko MongoDB se jodne ke liye ek URL chahiye.
Tum Docker ke through MongoDB chala rahe ho, isliye URL 100% fix hai:

mongodb://localhost:27017/YOUR_DB_NAME


Ye tum khud database ka naam decide kar sakte ho.

🖥 Practical:

.env file:

MONGO_URL=mongodb://localhost:27017/mydatabase

⭐ STEP 6 — Create db.js
📌 Theory:

Ye file MongoDB se connection banati hai.

🖥 Practical:
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected (Docker)");
  } catch (err) {
    console.error("Connection Error:", err);
  }
}

⭐ STEP 7 — Use connectDB() in server.js
import express from "express";
import { connectDB } from "./db.js";

const app = express();
connectDB();

app.listen(3000, () => console.log("Server running..."));

⭐ STEP 8 — docker exec -it my-mongo mongosh
📌 Theory:

MongoDB Docker ke box ke andar hai.
Agar tum andar jaa kar dekhna chahte ho ki data aa raha hai ya nahi, toh tum box ke andar "Mongo Shell" kholte ho.

Exactly like:

“Open the MongoDB command window inside Docker.”

🖥 Practical:
docker exec -it my-mongo mongosh


Shell open ho jaayegi → phir:

show dbs
use mydatabase
show collections
db.<collection>.find()

⭐ VERY EASY EXPLANATION — Why you don’t see your database initially

MongoDB me database tab tak exist hi nahi karta
👉 jab tak uske andar kuch data insert nahi hota.

Matlab kya?

Socho MongoDB ek “empty notebook” jaisa hai.

Jab tak tum pehli line nahi likhte

Notebook ka naam list me nahi dikhega

Same MongoDB me hota hai.

⭐ Example (REAL LIFE type)
🎒 Imagine you bought an empty notebook.

Bahar se koi naam nahi likha

Andar bhi koi page nahi likha

Toh notebook ko koi list me nahi add karega

But
Jab tum usme ek line likh doge (data insert)
To notebook ka naam list me aa jayega.

⭐ MongoDB me kya hota hai?
👉 Tum .env me likhte ho:
mongodb://localhost:27017/mydatabase


Par iska matlab yeh nahi ki database create ho gaya.

Mongo thinks:

“Theek hai, agar tum data daaloge tab main mydatabase naam ka database bana dunga.”

⚠️ Isliye jab tum show dbs Type karte ho:
admin
config
local


ONLY these appear.

⭐ When does your database appear?

JAB TUM PEHLI BAAR DATA INSERT KARTE HO.

Example:

await Test.create({ name: "Money" });


Tab MongoDB automatically:

mydatabase create karega

Usme collection banayega

Usme document store karega

Phir show dbs me tum dekhoge:

mydatabase

⭐ SUPER SIMPLE SUMMARY (1 line)

MongoDB database tab hi list me dikhta hai jab uske andar at least 1 data (document) insert ho jaaye.
Insert se pehle database “invisible” hota hai.
then for vidoe go to stream na as we have to there create app ..
https://getstream.io/video/video-calling/?utm_source=youtube&utm_medium=referral&utm_content=&utm_campaign=burak

so go to terminal click on + choose zzsh and then in terminal wirte :openssl rand -base64 32    
so this is what jwt token we can write anything but we want to genrate it so we use this 
so to connect with mongodb we can do diretcly as :
🔵 OPTION 3 — VS Code MongoDB plugin

Aur haan, yahi sabse easy option hai.

Steps:

VS Code khol

Extensions me jao

Search → "MongoDB for VS Code"

Install

Sidebar me MongoDB icon dikh jayega

Click Connect

Enter URL:

mongodb://localhost:27017


Click databases → tumhara database dikhega

Usme jao → collections dikhenge → documents (data) dekh sakte ho
so when we connect we see it as i done this and  2 dn way is;
⭐ BONUS — Direct Docker shell se bhi dekh sakte ho (Option 1)
docker exec -it my-mongo mongosh
show dbs
use mydatabase
show collections
db.users.find()


see hashnode ese hi