import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js"; "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const products = document.getElementById("products");
const search = document.getElementById("search");

let allProducts = [];


async function loadProducts() {

  products.innerHTML = "";

  const snap = await getDocs(collection(db, "products"));


  snap.forEach((item)=>{

    allProducts.push(item.data());

  });


  showProducts(allProducts);

}



function showProducts(items){

  products.innerHTML = "";


  items.forEach((p)=>{


    products.innerHTML += `

    <div class="card">

      <img src="${p.image}">

      <h2>${p.name}</h2>

      <p>${p.price} грн</p>

      <button onclick="buyProduct('${p.name}', '${p.price}')">
Купити
</button>

    </div>

    `;


  });


}



search.addEventListener("input",()=>{


  let text = search.value.toLowerCase();


  let result = allProducts.filter(p=>

    p.name.toLowerCase().includes(text)

  );


  showProducts(result);


});



loadProducts();let cart = [];


window.buyProduct = function(name, price) {

    cart.push({
        name:name,
        price:price
    });


    document.getElementById("count").innerText = cart.length;


    alert("Товар додано в кошик 🛒");

};window.openCart = function(){

    document.getElementById("cartWindow").style.display="block";

    showCart();

};



window.closeCart = function(){

    document.getElementById("cartWindow").style.display="none";

};



function showCart(){

    const box = document.getElementById("cartItems");

    const total = document.getElementById("total");


    box.innerHTML="";

    let sum = 0;


    cart.forEach(item=>{


        box.innerHTML += `

        <p>
        ${item.name} - ${item.price} грн
        </p>

        `;


        sum += Number(item.price);


    });


    total.innerText=sum;


}window.order = async function(){

    if(cart.length === 0){

        alert("Кошик пустий!");

        return;

    }


    let name = prompt("Ваше ім'я:");

    let phone = prompt("Ваш номер телефону:");


    await addDoc(collection(db,"orders"),{

        name:name,

        phone:phone,

        products:cart,

        date:Date.now()

    });


    alert("Замовлення прийнято! ✅");


    cart=[];

    document.getElementById("count").innerText=0;

    closeCart();

};