let products = JSON.parse(localStorage.getItem("products")) || [

{
name:"Токарний станок",
price:"25000 грн",
image:"https://images.unsplash.com/photo-1581092919535-7146ff1a5905?w=600"
},

{
name:"Дриль",
price:"2500 грн",
image:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600"
},

{
name:"Болгарка",
price:"3700 грн",
image:"https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600"
}

];

let cart=[];

function render(){

const container=document.getElementById("products");

container.innerHTML="";

products.forEach(product=>{

container.innerHTML+=`

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.price}</p>

<button onclick="buy('${product.name}','${product.price}')">Купити</button>

</div>

`;

});

}

function buy(name,price){

cart.push({name,price});

document.getElementById("count").innerText=cart.length;

alert(name+" додано в кошик!");

}

render();