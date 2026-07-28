import { db } from "./firebase.js";


import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


window.addAd = async function(){


let title = document.getElementById("title").value;
let description = document.getElementById("description").value;
let price = document.getElementById("price").value;
let phone = document.getElementById("phone").value;


await addDoc(collection(db,"ads"),{


title:title,

description:description,

price:price,

phone:phone,

date:Date.now()


});


alert("Оголошення додано!");

location.href="index.html";


}