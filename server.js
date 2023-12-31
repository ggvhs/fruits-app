const express = require("express");
const fruits = require("./models/fruits.js");
const vegetables = require("./models/vegetables.js");

const app = express();
const port = 3006;

// SETTING UP VIEW ENGINE
app.set("views", `${__dirname}/views`);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// LISTENER
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}.`);
});

// INDEX PAGE
app.get("/", (req, res) => {
    res.send(`
        <h1>Here at the Fruits And Veggies Page, we have a wide assortment of healthy items.</h1>
        <br/><br/>
        <h2>What will you check first?</h2>
        <br/><br/>
        <a href="/fruits">Our Fruits Selection<a/>
        <br/><br/>
        <a href="/vegetables">Our Veggie Selection<a/>
        `);
});

//MiddleWare
app.use((req,res,next)=> {
    console.log('I run for all routes!')
    next();
})

//this allows the body 
app.use(express.urlencoded({extended:false}))

// FRUIT ROUTES
app.get("/fruits", (req, res) => {
    res.render("fruits/Index", {
        fruits: fruits
    });
});

//new route

app.get('/fruits/new' , (req,res) =>{
    res.render('fruits/New')
})

//create
app.post('/fruits', (req,res) => {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else{
        req.body.readyToEat = false;
    }
    fruits.push(req.body)
    console.log("the fruits array", fruits)
    res.redirect("/fruits")
})

app.get("/fruits/:index", (req, res) => {
    res.render("fruits/Show", { // SECOND PARAM MUST BE AN OBJECT
        fruit: fruits[req.params.index]
    });
});

// VEGETABLE ROUTES
app.get("/vegetables", (req, res) => {
    res.render("veg/Index", { // THIS REGARDS YOUR COMPONENTS FOLDER AND FILE.
        vegetables: vegetables
    });
});

//new route

app.get('/veg/new' , (req,res) =>{
    res.render('veg/New')
})

//create
app.post('/vegetables', (req,res) => {
    console.log(req.body)
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else{
        req.body.readyToEat = false;
    }
    vegetables.push(req.body)
    console.log("the vegetables array", vegetables)
    res.redirect("/vegetables")
})

app.get("/vegetables/:index", (req, res) => {
    res.render("veg/Show", {
        vegetable: vegetables[req.params.index]
    });
});