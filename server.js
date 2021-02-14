const express = require("express");
const https = require("https")


const app = express();
app.use(express.urlencoded({extended:true}));


app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");
  //res.send("Server is up and running");


})

app.post("/", function(req, res){
  var city = req.body.city;
  console.log(city);

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bd899b5a40feeb8c5535522298bbd019&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const description = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";
      res.write("<p>The weather is currently" + description +"</p>");
      res.write("<h1>The temperature in " + city + " is " + temp +" degree celsius.</h1>");
      res.write("<img src="+iconURL +">");
      res.send();

    })
  }

  )

})





app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})
