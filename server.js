const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
const url = "mongodb://localhost:27017/";
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

app.get("/addPatient", function (req, res) {
    res.render("addPatient.html");
});

app.get("/listDoctors", function (req, res) {
    res.render("listDoctors.html");
});

app.get("/listPatients", function (req, res) {
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