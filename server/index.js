import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'

const app = express()

env.config()

app.use(express.static("public"))
app.use(cors())
app.use(bodyParser.json())


// Configure open api
const configuration = new Configuration({
    apiKey: process.env.API_KEY 
})
const openai = new OpenAIApi(configuration)


// listeninng
app.listen("3000", ()=>console.log("listening on port 3000"))


//post route for making requests
app.post('/', async (req, res)=>{
    const {message} = req.body

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})