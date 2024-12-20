const mask = document.getElementById("Mask");

// Add Button Popup 

function addPopup(){
    let a=document.getElementById("BookTableForm");
    a.style.top = "50%";
    a.style.transform = "translate(-50%,-50%) scale(1)";
    a.style.opacity = "1";
    a.style.display = "block";
    mask.style.display = "block";
};

function editPopup(){
    let a=document.getElementById("EditTableForm");
    a.style.top = "50%";
    a.style.transform = "translate(-50%,-50%) scale(1)";
    a.style.opacity = "1";
    a.style.display = "block";
    mask.style.display = "block";
};

// close Add Button Popup

function closeAddPopup(){
    let a=document.getElementById("BookTableForm");
    a.style.display = "none";
    mask.style.display = "none";
    
}

function closeEditPopup(){
    let a=document.getElementById("EditTableForm");
    a.style.display = "none";
    mask.style.display = "none";
}

// Add data in array formate


let array = []
addFormData()

function read(){
    event.preventDefault()
    let formData = {}
    formData["bookedBy"] = document.getElementById("bookedBy").value
    formData["phoneNumber"] = document.getElementById("phoneNumber").value
    formData["tableNumber"] = document.getElementById("tableNumber").value
    formData["noOfPerson"] = document.getElementById("noOfPerson").value
    formData["diningStartTime"] = document.getElementById("diningStartTime").value
    formData["diningEndTime"] = document.getElementById("diningEndTime").value
    array.push(formData)
    addFormData()
    closeAddPopup()
    resetData()
}


function addFormData(){
    var table = `
                <thead>
                    <tr>
                        <th>Table Number</th>
                        <th>Booked By</th>
                        <th>Phone Number</th>
                        <th>No of Persons</th>
                        <th>Dining Start Time</th>
                        <th>Dining End Time</th>
                        <th>TotalAmount</th>
                        <th>Edit & Delete</th>
                    </tr>
                </thead>
                <tbody>`
    
    array.forEach( addtableData => {
        table += `
                    <tr>
                        <td>${addtableData.tableNumber}</td>
                        <td>${addtableData.bookedBy}</td>
                        <td>${addtableData.phoneNumber}</td>
                        <td>${addtableData.noOfPerson}</td>
                        <td>${addtableData.diningStartTime}</td>
                        <td>${addtableData.diningEndTime}</td>
                        <td>${addtableData.noOfPerson * 1450}</td>
                        <td><i class="fa-solid fa-pen-to-square" onclick="editData(this)"></i>
                            <i class="fa-solid fa-trash-can" onclick="deleteData(this)"></i>
                        </td>
                    </tr>
            `              
    })

    table += `</tbody>`

    document.getElementById("formData").innerHTML = table

    sessionStorage.setItem("OrderDetail",JSON.stringify(array))

    console.log(array)
}


function editData(row){
    
    editRow = row.parentElement.parentElement;
    rowEdit = editRow.cells[1].innerHTML
    console.log(rowEdit)
    
    array.forEach(index => {

        if( rowEdit == index.bookedBy){
            document.getElementById("bookedBy1").value = index.bookedBy
            document.getElementById("phoneNumber1").value = index.phoneNumber
            document.getElementById("tableNumber1").value = index.tableNumber
            document.getElementById("noOfPerson1").value = index.noOfPerson
            document.getElementById("diningStartTime1").value = index.diningStartTime
            document.getElementById("diningEndTime1").value = index.diningEndTime
        }

    })

    editPopup()
}

function updateData(){

    event.preventDefault()
    
    let rowEdit = document.getElementById("bookedBy1").value;
    console.log(rowEdit)
    
    array.forEach(index => {

        if( rowEdit == index.bookedBy){
            index.bookedBy = document.getElementById("bookedBy1").value 
            index.phoneNumber = document.getElementById("phoneNumber1").value
            index.tableNumber = document.getElementById("tableNumber1").value
            index.noOfPerson = document.getElementById("noOfPerson1").value
            index.diningStartTime = document.getElementById("diningStartTime1").value
            index.diningEndTime = document.getElementById("diningEndTime1").value
            addFormData()
        }
    })
    closeEditPopup()
}

function deleteData(row){
    let boolean = confirm("Do you want delete?");
    if(boolean){
        deleteRow = row.parentElement.parentElement;
        rowEdit = deleteRow.cells[1].innerHTML

        array.forEach( index => {
            if(rowEdit==index.bookedBy){
                array.splice((deleteData.rowIndex)-1,1)
                addFormData()
            }
        })
        alert("Order deleted")
    }else{
        alert("Order not delete")
    }
}

function resetData(){
    event.preventDefault()
    document.getElementById("bookedBy").value = ""
    document.getElementById("phoneNumber").value = ""
    document.getElementById("tableNumber").value = ""
    document.getElementById("noOfPerson").value = ""
    document.getElementById("diningStartTime").value = ""
    document.getElementById("diningEndTime").value =  ""
}

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

  const myArray = [1, 2, 3, 4, 5];
    
    // Convert array to JSON string
    const arrayStr = encodeURIComponent(JSON.stringify(myArray));
    
    // Link to pass the array
    const link = document.createElement('a');
    link.href = 'dashboard.html?array=' + arrayStr;
    
    document.body.appendChild(link);







