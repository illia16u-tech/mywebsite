import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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



loadProducts();
loadAds();

let cart = [];

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


    adsBox.innerHTML += `

<div class="card">

<img src="${a.image}" style="width:200px;height:200px;object-fit:cover;">

<h2>${a.name}</h2>

<p>${a.desc}</p>

<b>${a.price} грн</b>

<br><br>

<button onclick="deleteAd('${item.id}')">
🗑 Видалити
</button>

</div>

`;

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

};window.openAdd=function(){

document.getElementById("addWindow").style.display="block";

}



window.closeAdd=function(){

document.getElementById("addWindow").style.display="none";

}



window.addAd = async function(){

let name = document.getElementById("adName").value;
let price = document.getElementById("adPrice").value;
let desc = document.getElementById("adDesc").value;

let file = document.getElementById("adImage").files[0];


if(!name || !price || !file){

alert("Заповни всі поля!");

return;

}


let reader = new FileReader();


reader.onload = async function(e){


await addDoc(collection(db,"ads"),{

name:name,

price:price,

desc:desc,

image:e.target.result,

date:Date.now()

});


alert("Оголошення додано!");


closeAdd();


};



reader.readAsDataURL(file);

}  
async function loadAds(){

  const adsBox = document.getElementById("ads");

  if(!adsBox) return;


  adsBox.innerHTML = "";


  const snap = await getDocs(collection(db,"ads"));


  snap.forEach((item)=>{

    let a = item.data();


    adsBox.innerHTML += `

    <div class="card">

      <img src="${a.image}" style="width:200px;height:200px;object-fit:cover;">

      <h2>${a.name}</h2>

      <p>${a.desc}</p>

      <b>${a.price} грн</b>

    </div>

    `;

  });

} 
window.deleteAd = async function(id){

let ok = confirm("Видалити оголошення?");

if(!ok) return;


await deleteDoc(doc(db,"ads",id));


alert("Оголошення видалено");


loadAds();

};
