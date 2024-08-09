import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/weather-report", async (req, res) => {
    const cityName = req.body.city;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        res.render("index.ejs", {data: response.data});
    }
    catch(error){
        res.render("index.ejs", {data: null});
    }
    
})

app.listen(PORT, () => {
    console.log(`The server is running on the port ${PORT}`);
})