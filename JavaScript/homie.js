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
    document.getElementById("noOfPersonSpan").innerHTML = ""
    document.getElementById("noOfPersonSpan").style.display = "none"
}

function closeEditPopup(){
    let a=document.getElementById("EditTableForm");
    a.style.display = "none";
    mask.style.display = "none";
    document.getElementById("noOfPersonEditSpan").innerHTML = ""
    document.getElementById("noOfPersonEditSpan").style.display = "none"
}

// Add data in array formate


let array = []
storage()
addFormData()

function storage(){
    let a = localStorage.key("OrderDetail")
    if(a){
        let b = localStorage.getItem(a)
        array = JSON.parse(b)
    }else{
        let b = JSON.stringify(array)
        localStorage.setItem("OrderDetail",b)
    }
}

function read(){
    event.preventDefault()
    let formData = {}
    formData["bookedBy"] = document.getElementById("bookedBy").value
    formData["phoneNumber"] = document.getElementById("phoneNumber").value
    formData["tableNumber"] = document.getElementById("tableNumber").value
    formData["noOfPerson"] = document.getElementById("noOfPerson").value
    formData["diningStartTime"] = document.getElementById("diningStartTime").value
    formData["diningEndTime"] = document.getElementById("diningEndTime").value

    let a = new Date(formData["diningStartTime"])
    let b = new Date(formData["diningEndTime"])

    if(formData["tableNumber"] > 0 && formData["tableNumber"] <= 5 ){
        if( !(formData["noOfPerson"] >= 1 && formData["noOfPerson"] <= 5) ){
            document.getElementById("noOfPersonSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 5 persons "
            document.getElementById("noOfPersonSpan").style.display = "block"
            return
        }
    }else if(formData["tableNumber"] > 5 && formData["tableNumber"] <= 10 ){
        if( !(formData["noOfPerson"] >= 1 && formData["noOfPerson"] <= 10) ){
            document.getElementById("noOfPersonSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 10 persons "
            document.getElementById("noOfPersonSpan").style.display = "block"
            return
        }
    }
    
    document.getElementById("noOfPersonSpan").innerHTML = ""
    document.getElementById("noOfPersonSpan").style.display = "none"

    if( a >= b ){
        alert("The end time should be greater than the start time")
        return
    }

    let c = array;
    if(true){
        let bool = false;
        for(i in c){
            if(c[i]["tableNumber"]==formData["tableNumber"]){
                if(new Date(c[i]["diningEndTime"]) > a){
                    bool = true;
                }
            }
        }
        if(bool){
            alert("table no." + formData["tableNumber"] +" was Booked")
            return
        }
    }

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

    localStorage.setItem("OrderDetail",JSON.stringify(array))

    document.getElementById("formData").innerHTML = table

    console.log(array)
}


function editData(row){
    
    editRow = row.parentElement.parentElement;
    rowEdit = editRow.cells[2].innerHTML
    console.log(rowEdit)
    
    array.forEach(index => {

        if( rowEdit == index.phoneNumber){
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

    let tableNumber1 = document.getElementById("tableNumber1").value
    let noOfPerson1 = document.getElementById("noOfPerson1").value
    let diningStartTime1 = document.getElementById("diningStartTime1").value
    let diningEndTime1 = document.getElementById("diningEndTime1").value

    let a = new Date(diningStartTime1)
    let b = new Date(diningEndTime1)

    if(tableNumber1 > 0 && tableNumber1 <= 5 ){
        if( !(noOfPerson1 >= 1 && noOfPerson1 <= 5) ){
            document.getElementById("noOfPersonEditSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 5 persons "
            document.getElementById("noOfPersonEditSpan").style.display = "block"
            return
        }
    }else if(formData["tableNumber"] > 5 && formData["tableNumber"] <= 10 ){
        if( !(noOfPerson1 >= 1 && noOfPerson1 <= 10) ){
            document.getElementById("noOfPersonEditSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 10 persons "
            document.getElementById("noOfPersonEditSpan").style.display = "block"
            return
        }
    }
    
    document.getElementById("noOfPersonEditSpan").innerHTML = ""
    document.getElementById("noOfPersonEditSpan").style.display = "none"

    if( a >= b ){
        alert("The end time should be greater than the start time")
        return
    }
    
    let rowEdit = document.getElementById("phoneNumber1").value;
    console.log(rowEdit)
    
    array.forEach(index => {

        if( rowEdit == index.phoneNumber){
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

function resetValue(){
    document.getElementById("bookedBy1").value = ""
    document.getElementById("tableNumber1").value = ""
    document.getElementById("noOfPerson1").value = ""
    document.getElementById("diningStartTime1").value = ""
    document.getElementById("diningEndTime1").value =  ""
}

// Search by Table no

function searchInput() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value;
    table = document.getElementById("formData");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.innerText;
        if (txtValue.indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

 



