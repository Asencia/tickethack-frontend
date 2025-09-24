document.querySelector("#search").addEventListener("click", () => {

    const depart = document.querySelector("#depart").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value.split("-").reverse().join("/");


    fetch("http://localhost:3000/trips", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        if(data){
            document.querySelector("#result").innerHTML = `
            <div class = "trip">${data[0].departure} > ${data[0].arrival}</div>
            <div class = "hour">${data[0].date}</div>
            <div class = "price">${data[0].price}€</div>
            <div class = "book"><button id="btn-book"> Book </button></div>
                `;
        }

            for (let i = 0 ; i < data.length; i++) {
                document.querySelector("#result").innerHTML += `
                <div class = "trip">${data[i].departure} > ${data[i].arrival}</div>
                <div class = "hour">${data[i].date}</div>
                <div class = "price">${data[i].price}€</div>
                <div class = "book"><button class="btn-book"> Book </button></div>
                    `;
            }

    })
})

document.querySelector(".btn-book").addEventListener("click", () => {
    window.location.assign('cart.html');
})