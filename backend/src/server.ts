import express, { type Request, type Response } from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT || 'your port address'
const app = express();

app.get('/',(req:Request,res:Response) => {
    res.status(200).json({
        "message":"This is SHTS api"
    })
})

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
})