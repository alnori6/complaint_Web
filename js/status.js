const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");

const uno = document.querySelector(".uno");
const dous = document.querySelector(".dous");
const treas = document.querySelector(".treas");

one.onclick = function() {
    one.classList.toggle("active");
    two.classList.remove("active");
    three.classList.remove("active");

    uno.classList.toggle("weight");
    dous.classList.remove("weight");
    treas.classList.remove("weight");
}

two.onclick = function() {
    one.classList.add("active");
    two.classList.toggle("active");
    three.classList.remove("active");

    uno.classList.add("weight");
    dous.classList.toggle("weight");
    treas.classList.remove("weight");
}
three.onclick = function() {
    one.classList.add("active");
    two.classList.add("active");
    three.classList.toggle("active");

    uno.classList.add("weight");
    dous.classList.add("weight");
    treas.classList.toggle("weight");
}


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {

  if (event.target == modal) {

    modal.style.display = "none";
    
  }

}




const toggle = () => {
    // alert("working");
    document.getElementById('nav').classList.toggle('navactive')
}



const btn = document.querySelector("button");
// const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
// const editBtn = document.querySelector(".edit");

btn.onclick = ()=>{
  widget.style.display = "none";
  // post.style.display = "block";
  return false;
}


const ratingInputs = document.querySelectorAll('.rating input');

ratingInputs.forEach((input) => {
  input.addEventListener('change', () => {
    const selectedRating = input.value;
    console.log('Selected rating:', selectedRating);
  });
});