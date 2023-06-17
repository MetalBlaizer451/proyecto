const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const LogInCollection = require("./mongodb");
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.post('/signup', async (req, res) => {
    const data = new LogInCollection({
        name: req.body.name,
        password: req.body.password
    });
    await data.save();

    const newData = {
        name: req.body.name,
        password: req.body.password
    };

    const checking = await LogInCollection.findOne({ name: req.body.name });

    try {
        if (checking.name === req.body.name && checking.password === req.body.password) {
            res.send("user details already exist");
        } else {
            await LogInCollection.insertMany([newData]);
        }
    } catch {
        res.send("wrong inputs");
    }

    res.status(201).render("home", {
        naming: req.body.name
    });
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
        } else {
            res.send("incorrect password");
        }
    } catch (e) {
        res.send("wrong details");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${3002}`);
});
