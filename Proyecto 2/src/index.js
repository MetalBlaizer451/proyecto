const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const mongoose = require("mongoose");

const port = process.env.PORT || 3006;

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/CalendarApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// Modelo de eventos de calendario
const CalendarEvent = require("./mongodb");

app.get('/calendar', (req, res) => {
    res.render('calendar');
});

app.post('/schedule', (req, res) => {
    const deliveryOption = req.body.deliveryOption;
    // Aquí puedes implementar la lógica para manejar la opción seleccionada
    // y realizar las acciones correspondientes, como almacenar la fecha de entrega en la base de datos, enviar notificaciones, etc.
    // Puedes acceder a la opción seleccionada a través de la variable "deliveryOption".

    // Ejemplo de manejo de la opción seleccionada
    let deliveryMessage = "";
    if (deliveryOption === "oneMonth") {
        deliveryMessage = "Entrega programada dentro de un mes.";
    } else if (deliveryOption === "sameDay") {
        deliveryMessage = "Entrega programada para el mismo día con una hora específica.";
    } else if (deliveryOption === "immediate") {
        deliveryMessage = "Entrega inmediata.";
    }

    // Crear un nuevo objeto de evento de calendario
    const newEvent = new CalendarEvent({
      deliveryOption: deliveryOption,
      deliveryMessage: deliveryMessage,
    });

    // Guardar el evento en la base de datos
    newEvent.save()
      .then(() => {
        res.send(deliveryMessage);
      })
      .catch((error) => {
        console.log('Error al guardar el evento en la base de datos:', error);
        res.status(500).send('Error al guardar el evento en la base de datos');
      });
});

app.listen(port, () => {
    console.log(`Server is running on port ${3006}`);
});
