import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const list = document.getElementById("list");


// ДОДАТИ ТОВАР
window.addProduct = async function () {

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const file = document.getElementById("image").files[0];


  if (!name || !price || !file) {

    alert("Заповни всі поля!");

    return;

  }


  const reader = new FileReader();


  reader.onload = async function(e) {


    try {


      await addDoc(collection(db, "products"), {

        name: name,

        price: price,

        image: e.target.result,

        date: Date.now()

      });


      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("image").value = "";


      alert("Товар додано!");


      loadProducts();


    } catch(error) {


      console.error(error);

      alert("Помилка додавання!");

    }


  };


  reader.readAsDataURL(file);


};




// ПОКАЗ ТОВАРІВ
async function loadProducts() {


  list.innerHTML = "";


  const snap = await getDocs(collection(db, "products"));



  snap.forEach((item)=>{


    const p = item.data();



    list.innerHTML += `

    <div style="
    background:white;
    padding:15px;
    margin:15px 0;
    border-radius:10px;
    box-shadow:0 0 10px #ccc;
    ">


    <img src="${p.image}" 
    style="
    width:120px;
    height:120px;
    object-fit:cover;
    border-radius:8px;
    ">


    <br><br>


    <b>${p.name}</b>


    <br>


    ${p.price} грн


    <br><br>


    <button onclick="removeProduct('${item.id}')">

    🗑 Видалити

    </button>


    </div>

    `;


  });


}




// ВИДАЛЕННЯ ТОВАРУ
window.removeProduct = async function(id) {


  if(!confirm("Видалити товар?")) {

    return;

  }


  try {


    await deleteDoc(doc(db,"products",id));


    alert("Товар видалено!");


    loadProducts();



  } catch(error) {


    console.error(error);

    alert("Помилка видалення!");


  }


};




// ЗАПУСК
loadProducts();