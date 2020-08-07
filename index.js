const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.set("view engine","ejs");

app.listen(PORT,function () {
    console.log("sever is running ...")
})

app.get("/",function (req,res) {
    res.render("home");
})

app.get("/products",function (req,res) {
    res.render("products");
})
app.get("/menu",function (req,res) {
    res.render("menu");
})
app.get("/our-team",function (req,res) {
    res.render("ourteam");
})

app.get("/our-team",function (req,res) {
    res.render("ourteam");
})

app.get("/products-detail",function (req,res) {
    res.render("products-detail");
})

const fs = require("fs")
app.get("/even",function (req,res) {
    let products = fs.readFileSync("data/dataproducts.json","UTF-8");
    products = JSON.parse(products);
    res.render("even",{
        products:products
    });
})

app.get("/products-detail/:id",function (req,res) {
    let ID = req.params.id;
    let products = fs.readFileSync("data/dataproducts.json","UTF-8");
    products = JSON.parse(products);
    let count = 0;
    products.map(e=>{
        count++;
        if(e.id == ID){
            res.render("products-detail",{
                prd: e
            });
            count=0;
        }
    })
    if(count>= products.length){
        res.send("Khong tim thay");
    }
})