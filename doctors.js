const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: {
        firstName: {
            Type: String,
            required: true
        },
        lastName: String
    },
    dob: Date,
    address: {
        state: {
            Type: String,
            validate: {
                validator: function(aState) {
                    return aState.length >= 2 && aState.length <= 3;
                },
                message: "State should be 2 to 3 characters."
            }
        },
        suburb: String,
        street: String,
        unit: String // IDK??
    },
    numPatients: {
        Type: Number,
        validate: {
            validator: function(aNum) {
                return aNum >= 0;
            },
            message: "Number of patients cannot be negative"
        }
    }
});

module.exports = mongoose.model("Doctors", doctorSchema);