import express from 'express';
import {readUserFromFile, writeUserToFile} from "./services/fileService.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("ok")
})

app.post("/add-user",async (req,res)=>{

    try{
        const newUser = req.body

        const users = await readUserFromFile()
        users.push(newUser)

        await writeUserToFile(users)

        res.status(201).send(`Użytkownik ${newUser.name} został dodany`)
    }catch(err){
        console.error(err)
        res.status(500).send(`Erro: ${err}`)
    }

})



app.listen(port, () => {
    console.log("Listening on port " + port);
})

