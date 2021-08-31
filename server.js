const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
const url = "mongodb://localhost:27017/FIT2095Lab6_DB";
const Doctors = require("./models/doctors");
const Patients = require("./models/patients");

mongoose.connect(url, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Successfully connected");
});

app.set("PORT", 8080);

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.use(express.static('images'));
app.use(express.static("css")); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function (req, res) {
    res.render("index.html");
});

app.get("/addDoctor", function (req, res) {
    res.render("addDoctor.html");
});

app.post("/doctor-added", function(req, res) {
    console.log(req.body);

    let newDoctor = new Doctors({
        fullName: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        dob: req.body.dob,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        },
        numPatients: req.body.numPatients
    });

    newDoctor.save(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Saved successfully");
    });

    res.redirect("/listDoctors");
});

app.get("/addPatient", function (req, res) {
    res.render("addPatient.html");
});

app.post("/patient-added", function(req, res) {
    console.log(req.body);

    let newPatient = new Patients({
        fullName: req.body.fullName,
        doctor: mongoose.Types.ObjectId(req.body.doctor),
        age: req.body.age,
        visitDate: req.body.visitDate,
        caseDesc: req.body.caseDesc
    });

    newPatient.save(function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Saved successfully");
    });

    res.redirect("/listPatients");
});

app.get("/listDoctors", function (req, res) {
    Doctors.find({}, function (err, data) {
        if (err) {
            res.render("listDoctors.html");
        }
        res.render("listDoctors.html", {doctors: data});
    });
});

app.get("/listPatients", function (req, res) {
    Patients.find({}).populate("doctor").exec(function (err, data) {
        console.log(data);
    });
    res.render("listPatients.html");
});

app.get("/deletePatient", function (req, res) {
    res.render("deletePatient.html");
});

app.get("/updateDoctor", function (req, res) {
    res.render("updateDoctor.html");
});

app.get("*", function (req, res) {
    res.render("invalidData.html");
});

app.listen(app.get("PORT"), function() {
    console.log(`We are listening http://localhost:${app.get("PORT")}`);
});