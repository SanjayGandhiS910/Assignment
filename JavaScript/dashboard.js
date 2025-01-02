
let a = localStorage.getItem("OrderDetail");
let b = JSON.parse(a);

var html = "";
for( i in b){
    let srt = new Date(b[i]["diningStartTime"]);
    let end = new Date(b[i]["diningEndTime"]);
    const option = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    let srtTime = srt.toLocaleString('en-US',option);
    let endTime = end.toLocaleString('en-US',option);
    let formateSrt = srtTime.replace(',','');
    let formateEnd = endTime.replace(',','');
    html += `
        <div id="card">
            <img src="/Images/tableImg.jpg" alt="Table Image" height="200px" width="240px">
            <div id="detail">
                <p>Table Number : ${b[i]["tableNumber"]}</p>
                <p>Dining start time : ${formateSrt}</p>
                <p>Dining end time : ${formateEnd}</p>
                <p>Total Amount : ${b[i]["noOfPerson"]*1450}</p>
            </div>
        </div>`
}
document.getElementById("OrderDetails").innerHTML += html;