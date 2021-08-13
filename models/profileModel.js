const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    profession: String,
    DOB: String,
    contactnumber: String,
    titleline: String,
    about: String,
    img: {
        type: String,
        default: ""
    }

},
    {
        timestamp: true,
    }
);


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
