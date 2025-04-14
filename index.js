console.log("Hello world!")
const express = require("express");
const router = require("./route/router");

const app = express();
const PORT = 3000;

app.use(router)

app.listen(PORT , (err) =>{
    if(err){
        console.log("Error occured while listening to the server" , err);
        
    }else{
        console.log("Started listening to the server" , PORT);
    }
        
})

