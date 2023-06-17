const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/RecommendationForm")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    });

const recommendationSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true
    }
});

const RecommendationCollection = new mongoose.model('RecommendationCollection', recommendationSchema);

module.exports = RecommendationCollection;
