const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CalendarApp")
  .then(() => {
    console.log('Mongoose connected');
  })
  .catch((e) => {
    console.log('Failed to connect to MongoDB:', e);
  });

const logInSchema = new mongoose.Schema({
  deliveryOption: {
    type: String,
    required: true
  }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);

module.exports = LogInCollection;
