import fsPromises from "fs/promises"
import path from "path"
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const defaultFilePath = path.join(__dirname, "users.json")

const readUserFromFile = async (filePath=defaultFilePath, encoding="utf8") => {
    try{
        const data = await fsPromises.readFile(filePath, encoding)
        return data ? JSON.parse(data.toString()) : []

    }catch(err){
        if(err.code === "ENOENT"){
            await fsPromises.writeFile(filePath, JSON.stringify([], null, 2), encoding)

            return []
        }
        throw err
    }
}

const writeUserToFile = async(users, filePath=defaultFilePath, encoding="utf8") => {
    await fsPromises.writeFile(filePath, JSON.stringify(users, null, 2), encoding)
}

export {readUserFromFile, writeUserToFile}
