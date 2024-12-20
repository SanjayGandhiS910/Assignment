
let a = sessionStorage.getItem("OrderDetail")
let b = JSON.parse(a)

var html = ""
for( i in b){
    html += `
        <div id="card">
            <img src="/Images/tableImg.jpg" alt="Table Image" height="200px" width="240px">
            <div id="detail">
                <p>Table Number : ${b[i]["tableNumber"]}</p>
                <p>Dining start time : ${b[i]["diningStartTime"]}</p>
                <p>Dining end time : ${b[i]["diningEndTime"]}</p>
                <p>Total Amount : ${b[i]["noOfPerson"]*1450}</p>
            </div>
        </div>`
}
document.getElementById("OrderDetails").innerHTML += html