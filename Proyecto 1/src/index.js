const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const RecommendationCollection = require("./recommendationMongo");
const port = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/home', async (req, res) => {
    const recommendations = await RecommendationCollection.find({});
    res.render('home', { recommendations });
});

app.post('/search', async (req, res) => {
    const query = req.body.query;

    // Guardar la consulta en la base de datos
    const recommendation = new RecommendationCollection({
        query: query
    });
    await recommendation.save();

    // Lógica de recomendaciones
    let recommendations = [];
    if (query === "tecnologia") {
        recommendations = ["Smartphones", "Laptops", "Cámaras"];
    } else if (query === "restaurantes") {
        recommendations = ["Comida italiana", "Comida mexicana", "Comida asiática"];
    } else if (query === "mascotas") {
        recommendations = ["Perros", "Gatos", "Peces"];
    } else {
        recommendations = ["Recomendación 1", "Recomendación 2", "Recomendación 3"];
    }

    res.render('search', { recommendations });
});

app.listen(port, () => {
    console.log(`Server is running on port ${3005}`);
});
