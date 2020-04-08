const mongoose = require("mongoose");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

var app = express();

var date = new Date().getTime();
date += (2 * 60 * 60 * 1000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));


//mongoose.connect("mongodb://localhost:27017/sensorsDB",{useNewUrlParser: true,useUnifiedTopology: true})


//coonnect to the database
mongoose.connect("mongodb+srv://admin-walani:CHIKUMBUTSO12@cluster0-97kte.mongodb.net/sensorsDB",{ useNewUrlParser: true, useUnifiedTopology: true} )              //mongodb+srv://admin-walani:CHIKUMBUTSO12@cluster0-97kte.mongodb.net/sensorsDB

//creating a schema for the database
const sensorsSchema = mongoose.Schema({
  temp: Number,
  humid: Number,
  moist1: Number,
  moist2: Number,
  moist3: Number,
  temp1: Number,
  temp2: Number,
  temp3: Number,
  date: String

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
        console.log(result.temp1);
          console.log(result.humid);
      res.render("values",{
        temp: result.temp1,
        humid: result.humid,
        moist1: result.moist1,
        moist2: result.moist2,
        moist3: result.moist3,
        temp1: result.temp1,
        temp2: result.temp2,
        temp3: result.temp3


    })
  } ).sort( {_id: -1} ).limit(1)

})

app.get("/allData", function(req, res) {

  Sensor.find({}, function(err, foundSensors) {
    if (!err) {
      res.render("table", {
        sensors: foundSensors
      })
    } else {
      res.send("Invalid creditials please try again")
    }

  })
});

app.post("/mushroomData", function(req, res) {

  console.log(req.body);
  //calculating current tim
  const sensor = new Sensor({
    temp :req.body.temperature,
    humid: req.body.humidity,
    moist1: req.body.moistureOne,
    moist2: req.body.moistureTwo,
    moist3: req.body.moistureThree,
    temp1: req.body.tempSensor1,
    temp2: req.body.tempSensor2,
    temp3: req.body.tempSensor3,
    date: new Date().toUTCString()

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
