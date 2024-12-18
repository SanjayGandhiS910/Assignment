const mask = document.getElementById("Mask");

// Add Button Popup

const addPopup = document.getElementById("addPopup");
addPopup.addEventListener("click",function(){
    let a=document.getElementById("BookTableForm");
    a.style.top = "50%";
    a.style.transform = "translate(-50%,-50%) scale(1)";
    a.style.opacity = "1";
    a.style.display = "block";
    mask.style.display = "block";
});

// close Add Button Popup

const closeAddPopup = document.getElementById("closeAddPopup");
closeAddPopup.addEventListener("click",function(){
    let a=document.getElementById("BookTableForm");
    a.style.display = "none";
    mask.style.display = "none";
})