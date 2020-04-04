const mongoose = require("mongoose");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/sensorsDB",{useNewUrlParser: true,useUnifiedTopology: true})


//coonnect to the database
//mongoose.connect("mongodb+srv://admin-walani:CHIKUMBUTSO12@cluster0-97kte.mongodb.net/sensorsDB", { //              mongodb+srv://admin-walani:CHIKUMBUTSO12@cluster0-97kte.mongodb.net/sensorsDB

//creating a schema for the database
const sensorsSchema = mongoose.Schema({
  temperature: Number,
  Humidity: Number


});



//create a model
const Sensor = mongoose.model("sensor", sensorsSchema)


app.get("/", function(req, res) {

  //res.sendFile(__dirname + "/index.html")
  res.render("login")
})

app.get("/values",function(req,res) {

  Sensor.findOne({},function(err,result){
    if(err) throw err;
        console.log(result.temperature);
          console.log(result.humidity);
      res.render("values",{
        temp: result.temperature,
        humid: result.humidity,
        moistOne: result.moistureOne,
        moistTwo: result.moistureTwo,
        moistThree: result.moistureThree,
        temp1: result.temp1,
        temp2: result.temp2,
        temp3: result.temp3


    })
  } ).sort( {_id: -1} ).limit(1)

})

app.post("/mushroomData", function(req, res) {

  console.log(req.body);
  //calculating current tim
  const sensor = new Sensor({
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    moistureOne: req.body.moistureOne,
    moistureTwo: req.body.moistureTwo,
    moistureThree: req.body.moistureThree,
    temp1: req.body.tempSensor1,
    temp2: req.body.tempsensor2,
    temp3: req.body.tempsensor3,


  })
  sensor.save()


});

app.post("/",function(req,res){

  if (req.body.deviceId === "smartID1744" && req.body.password === "smartfarms") {
    res.render("results");
    }
})




app.listen(port, function() {

 console.log("server has been started successfully")
 var date = new Date().getTime();
date += (2 * 60 * 60 * 1000);
console.log(new Date(date).toUTCString());
});
