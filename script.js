document.querySelector("#search").addEventListener("click", () => {

    const depart = document.querySelector("#depart").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value.split("-").reverse().join("/"); // On attend un format DD/MM/YYYY


    fetch(`http://localhost:3000/trips?departure=${depart}&arrival=${arrival}&date=${date}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector("#result").innerHTML = ``;
        
        if (!data || data.length === 0) {
            document.querySelector("#result").innerHTML = `<p>No trip found.</p>`;
            return;
        }


        for (let i = 0 ; i < data.length; i++) {
            document.querySelector("#result").innerHTML += `
            <div class = "row-result">
                <div class = "trip">${data[i].departure} > ${data[i].arrival}</div>
                <div class = "hour">${data[i].date}</div>
                <div class = "price">${data[i].price}€</div>
                <button class="btn-book">Book</button>
            </div>
            `;
        }

    })
})

for(let i = 0; i < document.querySelectorAll(".btn-book"); i++) {
        document.querySelector(".btn-book")[i].addEventListener("click", function () {
        const choosenTrip = data[i];
        
        fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carts: [choosenTrip] })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Réponse back:", data);
            window.location.assign("cart.html");
        })
        .catch(console.error);
    })
}
