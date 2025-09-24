//récupérer les éléments présents dans le cart 
console.log("hello")
function calculateTotal() {
    const prices = document.querySelectorAll('.price-cart')//.reduce((acc, item) => acc + item.textContent,0)
    let total = 0
    for (let price of prices){
        total += Number(price.textContent)
        console.log(price.textContent)
    }
    console.log(total)
    document.querySelector('#summarize-cart').innerHTML =
                `
                <div id = "total-cart">Total : ${total}€</div>
                <div>
                    <button id = "purchase-cart">Purchase</button>
                </div>
                `
}
fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {


        if(data.carts){
            for (let i = 0 ; i < data.carts.length; i++) {
                //mettre le titre My cart
                document.querySelector('#text-cart').innerHTML = `
                <p>My Cart</p>
                `;

                //récupère les éléments dans carts
                document.querySelector('.trip-cart-section').innerHTML += `
                <div>
                <div class = "trip-cart">${data.carts[i].departure} > ${data.carts[i].arrival}</div>
                <div class = "hour-cart">${data.carts[i].date}</div>
                <div>
                <div class = "price-cart">${data.carts[i].price} </div> €
                </div> 
                <div class = "delete-cart"><button id="${data.carts[i]._id}"> x </button></div>
                </div>
                `; 
                
                //le montant total du panier
                calculateTotal();

                document.querySelector('#purchase-cart').addEventListener("click", function () {
                    const cart = data.carts[i];

                    const dateIso = new Date(cart.date).toISOString();

                    fetch('http://localhost:3000/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        departure: cart.departure,
                        arrival: cart.arrival,
                        date: dateIso,
                        price: cart.price })
                    })
                    .then(response => response.json())
                    .then(data => {
                                fetch(`http://localhost:3000/carts/`, {method : "DELETE"})
                                .then (response => response.json())
                                .then (data => {
                                if (data.result){
                                    document.querySelector('.trip-cart-section').innerHTML = "";
                                    document.querySelector('#text-cart').innerHTML = '<p>No ticket in your cart.</p>';
                                    document.querySelector('#summarize-cart').innerHTML = '<div id="total-cart">Total : 0€</div>';
                                }
                            }) 
                            console.log("Ok purchase", data);
                            window.location.assign("bookings.html");
                            });
            });
        }


              // bouton supprimer
            for (let i=0 ; i < document.querySelectorAll('.delete-cart').length; i++){
                document.querySelectorAll('button')[i].addEventListener('click', function () {
                fetch(`http://localhost:3000/carts/${this.id}`, {method : "DELETE"})
                .then (response => response.json())
                .then (data => {
                    if (data.result){
                        this.parentNode.parentNode.remove();
                        calculateTotal()
                    }
                }
            )
        }
    )
            }
        }
    }
)
function clickPurchase(){
    document.querySelector("#purchase-cart").addEventListener('click', function() {
        console.log("click purchase ok")
    })
}


/*
fetch('http://localhost:3000/carts')
                        .then(response => response.json())
                        .then(data => {
                            if(data.carts){
                                 document.querySelector('.trip-cart-section').innerHTML += `
                                     <div class = "trip-cart">${data.carts[i].departure} > ${data.carts[i].arrival}</div>
                                     <div class = "hour-cart">${data.carts[i].date.slice(11, 16)}</div>
                                     <div class = "price-cart">${data.carts[i].price}€</div>
                                     <div class = "delete-cart"><button id="${data.carts[i]._id}"> x </button></div>
                                     `;
                            }
                        })
*/


