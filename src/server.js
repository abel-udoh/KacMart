require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import connection  from "./configs/connectDB";

let app = express();

//Config View Engine
configViewEngine(app);

//init all web route
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Kacmart Eccomerce store is running on port ${PORT}!`));