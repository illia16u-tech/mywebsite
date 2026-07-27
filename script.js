let count = 0;

const buttons = document.querySelectorAll(".card button");

buttons.forEach(button=>{
button.onclick=()=>{
count++;
document.getElementById("count").innerText=count;
}
});

document.getElementById("search").addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

let text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});