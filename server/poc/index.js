import express from 'express';
import bodyParser from 'body-parser';
import axios from "axios";

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json())

import cors from 'cors';

app.use(cors({
    origin: '*' // TODO: for security use url allowed by client
}));


app.get('/', async (req, res, next) => {

    let address, lat, long, displayName, currentWeather

    address = req.query.q;

    if (!address && !address.length) {
        res.status(404).json({ message: "Localidade não fornecida!" });
    }

    let urlApiGeocode = `https://geocode.maps.co/search?q=${address}`;

    try {
        
        const resApi = await axios(urlApiGeocode);
        let resApiData;

        if (resApi && resApi.data.length > 0) {
            resApiData = resApi.data
            
            // res.status(200).json(resApiData);

            lat = resApiData[0].lat;
            long = resApiData[0].lon;

            displayName = resApiData[0].display_name


            if (!lat || !long) {
                res.status(404).json({ message: "Localidade não encontrada!" });
            }
            
            currentWeather = 'true';
        
            let urlApiWeather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=${currentWeather}`;
    
            try {
                const receivedWeatherData = await axios(urlApiWeather); 
                
                let response = {};

                    response = {
                        latitude: receivedWeatherData.data.latitude,
                        longitude: receivedWeatherData.data.longitude,
                        temperature: receivedWeatherData.data.current_weather.temperature,
                        windspeed: receivedWeatherData.data.current_weather.windspeed,
                        city: displayName
                    }
                
                res.status(200).json(response);

            } catch (error) {
                next(error);
            }
        
        }
        

    } catch (error) {
        next(error);
    }   

  });

app.listen(3000, () => {
  console.log('escutando...');
});