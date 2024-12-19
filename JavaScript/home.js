const mask = document.getElementById("Mask");
const date = new Date()
// Add Button Popup

function addPopup(){
    let a=document.getElementById("BookTableForm");
    a.style.top = "50%";
    a.style.transform = "translate(-50%,-50%) scale(1)";
    a.style.opacity = "1";
    a.style.display = "block";
    mask.style.display = "block";
};

// close Add Button Popup

const closeAddPopup = document.getElementById("closeAddPopup");
closeAddPopup.addEventListener("click",function(){
    let a=document.getElementById("BookTableForm");
    a.style.display = "none";
    mask.style.display = "none";
    resetData();
})


// Addd data to form

let row=null

function sumbitForm(){
    event.preventDefault()
    let a = read()
    if(row==null){
        getData(a)
    }else{
        updateData(a)
    }
    resetData()
}


function read(){
    let formData = {}
    formData["bookedBy"] = document.getElementById("bookedBy").value
    formData["phoneNumber"] = document.getElementById("phoneNumber").value
    formData["tableNumber"] = document.getElementById("tableNumber").value
    formData["noOfPerson"] = document.getElementById("noOfPerson").value
    formData["diningStartTime"] = document.getElementById("diningStartTime").value
    formData["diningEndTime"] = document.getElementById("diningEndTime").value
    
    if(formData["bookedBy"]==""){
        document.getElementById("bookedBySpan").style.display="block"
    }
    if(formData["phoneNumber"]==""){
        document.getElementById("phoneNumberSpan").style.display="block"
    }
    if(formData["tableNumber"]==""){
        document.getElementById("tableNumberSpan").style.display="block"
    }
    if(formData["noOfPerson"]=="" || formData["noOfPerson"] < 0){
        document.getElementById("noOfPersonSpan").style.display="block"
    }
    if(formData["diningStartTime"] > date.getDate()){
        document.getElementById("diningStartTimeSpan").style.display="block"
    }
    if(formData["diningEndTime"] < formData["diningStartTime"]){
        document.getElementById("diningEndTimeSpan").style.display="block"
    }

    return formData
}

function getData(data){
    let table = document.getElementsByTagName("tbody")[0]
    let row = table.insertRow(table.length)

    cell1 = row.insertCell(0)
    cell1.innerHTML = data.tableNumber

    cell2 = row.insertCell(1)
    cell2.innerHTML = data.bookedBy

    cell3 = row.insertCell(2)
    cell3.innerHTML = data.phoneNumber

    cell4 = row.insertCell(3)
    cell4.innerHTML = data.noOfPerson

    cell5 = row.insertCell(4)
    cell5.innerHTML = data.diningStartTime

    cell6 = row.insertCell(5)
    cell6.innerHTML = data.diningEndTime

    cell7 = row.insertCell(6)
    cell7.innerHTML = data.noOfPerson * 1450
    
    cell8 = row.insertCell(7)
    cell8.innerHTML = `
    <i class="fa-solid fa-pen-to-square" onclick="editData(this)"></i>
    <i class="fa-solid fa-trash-can" onclick="deleteData(this)"></i>`
}

function resetData(){
    row=null
    event.preventDefault()
    document.getElementById("bookedBy").value = ""
    document.getElementById("phoneNumber").value = ""
    document.getElementById("tableNumber").value = ""
    document.getElementById("noOfPerson").value = ""
    document.getElementById("diningStartTime").value = ""
    document.getElementById("diningEndTime").value =  ""
}

function deleteData(td){
    row = td.parentElement.parentElement
    document.getElementById("formData").deleteRow(row.rowIndex)
}

function editData(td){
    addPopup()
    row = td.parentElement.parentElement
    document.getElementById("bookedBy").value = row.cells[1].innerHTML
    document.getElementById("tableNumber").value = row.cells[0].innerHTML
    document.getElementById("phoneNumber").value = row.cells[2].innerHTML
    document.getElementById("noOfPerson").value = row.cells[3].innerHTML
    document.getElementById("diningStartTime").value = row.cells[4].innerHTML
    document.getElementById("diningEndTime").value =  row.cells[5].innerHTML
}

function updateData(data){
    row.cells[1].innerHTML = data.bookedBy
    row.cells[0].innerHTML = data.tableNumber
    row.cells[2].innerHTML = data.phoneNumber
    row.cells[3].innerHTML = data.noOfPerson
    row.cells[4].innerHTML = data.diningStartTime
    row.cells[5].innerHTML = data.diningEndTime
    row.cells[6].innerHTML = data.noOfPerson * 1450
}


// Search by Name

function searchInput() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("formData");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

