const mongoose = require("mongoose");

const patientsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        Type: String,
        required: true
    },
    doctor: {
        Type: mongoose.Schema.Types.ObjectId,
        ref: "Doctors"
    },
    age: {
        Type: Number,
        validate: {
            validator: function(anAge) {
                return anAge >= 0 && anAge <= 120;
            },
            message: "Age should be between 0 and 120"
        }
    },
    visitDate: {
        Type: Date,
        default: Date.now()
    },
    caseDesc: {
        Type: String,
        validate: {
            validator: function(aCaseDesc) {
                return aCaseDesc.length >= 10;
            },
            message: "Case description should have at least 10 characters"
        }
    }
});

module.exports = mongoose.model("Patients", patientsSchema);