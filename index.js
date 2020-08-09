const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.set("view engine","ejs");

app.listen(PORT,function () {
    console.log('sever is running ...')
})
// home page
app.get("/",function (req,res) {
    res.render("home");
})
// products page
app.get("/products",function (req,res) {
    res.render("products");
})
// menu page
app.get("/menu",function (req,res) {
    res.render("menu");
})
// our-team page
app.get("/our-team",function (req,res) {
    res.render("our-team");
})
// products-detail page
app.get("/products-detail",function (req,res) {
    res.render("products-detail");
})
// products page
const fs = require("fs")
app.get("/even",function (req,res) {
    let products = fs.readFileSync("data/dataproducts.json","UTF-8");
    products = JSON.parse(products);
    res.render("even",{
        products:products
    });
})
// products-search page
app.get("/products-search",function(req,res) {
    var couts = 0;
    let products = fs.readFileSync("data/dataproducts.json","utf-8");
    products = JSON.parse(products);
    var key = req.query.key;
    var matchedProducts = products.filter(function (product) {
        if(product.name.indexOf(key) !== -1){
            couts++
        }
        return product.name.indexOf(key) !== -1;
    });
    res.render("products-search",{
        products:matchedProducts,
        result:couts,
        value:key
    })
    console.log(couts);
})
// detail products page
app.get("/products-detail/:id",function (req,res) {
    let ID = req.params.id;
    let products = fs.readFileSync("data/dataproducts.json","UTF-8");
    products = JSON.parse(products);
    let count = 0;
    products.map(e=>{
        count++;
        if(e.id == ID){
            res.render("products-detail",{
                prd: e,
            });
            count=0;
        }
    })
    if(count>= products.length){
        res.send("Khong tim thay");
    }
})