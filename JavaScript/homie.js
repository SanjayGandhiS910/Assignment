const mask = document.getElementById("Mask");

// Add Button Popup 

function addPopup(){
    let a = document.getElementById("BookTableForm");
    a.classList.add("active")
    mask.classList.add("active")
};

function editPopup(){
    let a = document.getElementById("EditTableForm");
    a.classList.add("active");
    mask.classList.add("active");
};

// close Add Button Popup

function closeAddPopup(){
    let a = document.getElementById("BookTableForm");
    a.classList.remove("active");
    mask.classList.remove("active");
    document.getElementById("noOfPersonSpan").innerHTML = "";
    resetData()
};

function closeEditPopup(){
    let a = document.getElementById("EditTableForm");
    a.classList.remove("active");
    mask.classList.remove("active");
    document.getElementById("noOfPersonEditSpan").innerHTML = "";
};

// Delete Icon Popup

function deleteIconPopup(){
    let a = document.getElementById("comformPopup");
    a.classList.add("active");
}


// Add data in array formate


let array = [];
storage();

if(array.length == 0){
    noData();
}else{
    addFormData();
}


function storage(){

    let a = localStorage.key("OrderDetail");

    if(a){
        let b = localStorage.getItem(a);
        array = JSON.parse(b);
    }else{
        let b = JSON.stringify(array);
        localStorage.setItem("OrderDetail",b);
    }
}

// 
function read(){

    event.preventDefault();
    
    let formData = {}
    formData["bookedBy"] = document.getElementById("bookedBy").value;
    formData["phoneNumber"] = document.getElementById("phoneNumber").value;
    formData["tableNumber"] = document.getElementById("tableNumber").value;
    formData["noOfPerson"] = document.getElementById("noOfPerson").value;
    formData["diningStartTime"] = document.getElementById("diningStartTime").value;
    formData["diningEndTime"] = document.getElementById("diningEndTime").value;

    // Book Table Form validation

    let diningSrt = new Date(formData["diningStartTime"]);
    let diningEnd = new Date(formData["diningEndTime"]);
    let current = new Date();

    if(formData["tableNumber"] > 0 && formData["tableNumber"] <= 5 ){
        if( !(formData["noOfPerson"] >= 1 && formData["noOfPerson"] <= 5) ){
            document.getElementById("noOfPersonSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 5 persons";
            document.getElementById("noOfPersonSpan").classList.add("active");
            return;
        }
    }
    else if(formData["tableNumber"] > 5 && formData["tableNumber"] <= 10 ){
        if( !(formData["noOfPerson"] >= 1 && formData["noOfPerson"] <= 10) ){
            document.getElementById("noOfPersonSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 10 persons";
            document.getElementById("noOfPersonSpan").classList.add("active");
            return;
        }
    }
    
    document.getElementById("noOfPersonSpan").innerHTML = "";

    if( current > diningSrt ){
        alert("The start time should be greater than the current time");
        return;
    }
    else if( diningSrt >= diningEnd ){
        alert("The end time should be greater than the start time");
        return;
    }

    // the booking table already booked or not

    let d = array;

    if(true){
        let bool = false;
        for(let i in d){
            if(d[i]["tableNumber"] == formData["tableNumber"]){
                if(new Date(d[i]["diningEndTime"]) > a){
                    bool = true;
                }
            }
        }
        if(bool){
            document.getElementById("noOfPersonSpan").innerHTML = ""
            alert("table no." + formData["tableNumber"] +" was Booked");
            return;
        }
    }

    
    if(true){
        for(let i in d){
            if(d[i]["phoneNumber"]==formData["phoneNumber"]){
                    alert("already exits");
                    return;
            }
        }
    }

    array.push(formData);
    addFormData();
    closeAddPopup();
    resetData();
}

function addFormData(){

    localStorage.setItem("OrderDetail",JSON.stringify(array));

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
                <tbody id="tableBody">`

    
    let a = localStorage.getItem("OrderDetail");
    let b = JSON.parse(a);

    // diningStartTime and diningEndTime readable formate

    for(let i in b){

        let srt = new Date(b[i]["diningStartTime"]);
        let end = new Date(b[i]["diningEndTime"]);

        const option = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }

        let srtTime = srt.toLocaleString('en-US',option);
        let endTime = end.toLocaleString('en-US',option);
        let formateSrt = srtTime.replace(',','');
        let formateEnd = endTime.replace(',','');

    table += `
        <tr>
            <td>${b[i]["tableNumber"]}</td>
            <td>${b[i]["bookedBy"]}</td>
            <td>${b[i]["phoneNumber"]}</td>
            <td>${b[i]["noOfPerson"]}</td>
            <td>${formateSrt}</td>
            <td>${formateEnd}</td>
            <td>${b[i]["noOfPerson"] * 1450}</td>
            <td id="${b[i]["phoneNumber"]}"><i class="fa-solid fa-pen-to-square" onclick="editData(${i})"></i>
                <i class="fa-solid fa-trash-can" onclick="deleteData(${i})"></i>
            </td>
        </tr>`;
    }

    document.getElementById("formData").innerHTML = table;

}

function noData(){

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
                <tbody id="tableBody">
                    <tr>
                        <td colspan="8">No Data Here</td>
                    </tr>
                </tbody>`;
        
    document.getElementById("formData").innerHTML = table;

}

function editData(row){

    document.getElementById("bookedBy1").value = array[row].bookedBy;
    document.getElementById("phoneNumber1").value = array[row].phoneNumber;
    document.getElementById("tableNumber1").value = array[row].tableNumber;
    document.getElementById("noOfPerson1").value = array[row].noOfPerson;
    document.getElementById("diningStartTime1").value = array[row].diningStartTime;
    document.getElementById("diningEndTime1").value = array[row].diningEndTime;

    editPopup();
}

function updateData(){

    // // Edit Table Form funtionality

    let tableNumber1 = document.getElementById("tableNumber1").value;
    let noOfPerson1 = document.getElementById("noOfPerson1").value;
    let diningStartTime1 = document.getElementById("diningStartTime1").value;
    let diningEndTime1 = document.getElementById("diningEndTime1").value;

    let diningSrt = new Date(diningStartTime1);
    let diningEnd = new Date(diningEndTime1);
    let current = new Date();

    if(tableNumber1 > 0 && tableNumber1 <= 5 ){
        if( !(noOfPerson1 >= 1 && noOfPerson1 <= 5) ){
            document.getElementById("noOfPersonEditSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 5 persons";
            document.getElementById("noOfPersonEditSpan").classList.add("active");
            return;
        }
    }
    else if(formData["tableNumber"] > 5 && formData["tableNumber"] <= 10 ){
        if( !(noOfPerson1 >= 1 && noOfPerson1 <= 10) ){
            document.getElementById("noOfPersonEditSpan").innerHTML = "Max persons per table no " + formData["tableNumber"] + " is 10 persons";
            document.getElementById("noOfPersonEditSpan").classList.add("active");
            return;
        }
    }
    
    document.getElementById("noOfPersonEditSpan").innerHTML = "";

    if( current > diningSrt ){
        alert("The start time should be greater than the current time");
        return;
    }
    else if( diningSrt >= diningEnd ){
        alert("The end time should be greater than the start time");
        return;
    }

    // the booking table already booked or not
    
    let d = array;

    if(true){
        let bool = false;
        for(let i in d){
            if(d[i]["tableNumber"]==formData["tableNumber"]){
                if(new Date(d[i]["diningEndTime"]) > a){
                    bool = true;
                }
            }
        }
        if(bool){
            alert("table no." + formData["tableNumber"] +" was Booked");
            return;
        }
    }
    
    let rowEdit = document.getElementById("phoneNumber1").value;
    
    array.forEach( val => {

        if( rowEdit == val.phoneNumber){
            val.bookedBy = document.getElementById("bookedBy1").value;
            val.phoneNumber = document.getElementById("phoneNumber1").value;
            val.tableNumber = document.getElementById("tableNumber1").value;
            val.noOfPerson = document.getElementById("noOfPerson1").value;
            val.diningStartTime = document.getElementById("diningStartTime1").value;
            val.diningEndTime = document.getElementById("diningEndTime1").value;
            addFormData()
        }
    })

    closeEditPopup();
}

// delete the table data

function deleteData(row){

    let boolean = confirm("Do you want delete?");

    if(boolean){
        array.splice(row,1);
        addFormData();
    }
}

//reset button

function resetData(){
    document.getElementById("form").reset();
}

//reset button in 

function resetValue(){
    document.getElementById("bookedBy1").value = "";
    document.getElementById("tableNumber1").value = "";
    document.getElementById("noOfPerson1").value = "";
    document.getElementById("diningStartTime1").value = "";
    document.getElementById("diningEndTime1").value =  "";
}

// Search by Table no

function searchInput() {
    addFormData();
    var input, table, tr, td, txtValue;
    input = document.getElementById("search-input").value;
    table = document.getElementById("formData");
    tr = table.getElementsByTagName("tr");
    let count = array.length;
    for (let i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.innerHTML;
        if (txtValue.indexOf(input) > -1) {
          tr[i].style.display = "";
          count--;
        }
        else {
          tr[i].style.display = "none";
        }
      } 
    }
    if( count == array.length ){
        document.getElementById("tableBody").innerHTML =`
                <tr>
                    <td colspan="8">No data Found</td>
                </tr>`;
    }  
  }


//Remove the edit and delete icone based on current time 

setInterval( () => {
    let check = new Date();
    if(array.length > 0){
        for(let i in array){
            if( new Date(array[i]["diningStartTime"]) < check){
                try{
                    document.getElementById(array[i]["phoneNumber"]).innerHTML = "--";
                }catch(e){}
            }
        }
    }
},1000);




// localStorage.clear()

