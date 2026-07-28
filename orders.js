import { db } from "./firebase.js";


import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const orders = document.getElementById("orders");



async function loadOrders(){


const snap = await getDocs(collection(db,"orders"));



orders.innerHTML="";



snap.forEach(item=>{


const o = item.data();



orders.innerHTML += `


<div style="
background:#f5f5f5;
padding:20px;
margin:15px 0;
border-radius:15px;
">


<h2>👤 ${o.name}</h2>


<p>📱 ${o.phone}</p>


<h3>🛒 Товари:</h3>


${o.products.map(p=>`

<p>
${p.name} - ${p.price} грн
</p>

`).join("")}



</div>


`;



});



}



loadOrders();