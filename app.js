import express from 'express';
import {fetchUsers, storeUsers} from "./services/index.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const usersFilePath = path.join(path.resolve(), "users.json");


app.use(express.json());

app.get("/", (req,res)=>{
    res.send("ok")
})

app.post("/add-user",async (req,res)=>{

    try{
        const newUser = req.body

        const users = await fetchUsers(usersFilePath);
        users.push(newUser)

        await storeUsers(users, usersFilePath)

        res.status(201).send(`Użytkownik ${newUser.name} został dodany`)
    }catch(err){
        console.error(err)
        res.status(500).send(`Erro: ${err}`)
    }

})



app.listen(port, () => {
    console.log("Listening on port " + port);
})

