const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    dob: Date,
    address: {
        state: {
            type: String,
            validate: {
                validator: function(aState) {
                    return aState.length >= 2 && aState.length <= 3;
                },
                message: "State should be 2 to 3 characters."
            }
        },
        suburb: String,
        street: String,
        unit: Number
    },
    numPatients: {
        type: Number,
        validate: {
            validator: function(aNum) {
                return aNum >= 0;
            },
            message: "Number of patients cannot be negative"
        }
    }
});

module.exports = mongoose.model("Doctors", doctorSchema);