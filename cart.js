//récupérer les éléments présents dans le cart 
console.log("hello")
fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {
        if(data.carts){
            for (let i = 0 ; i < data.carts.length; i++) {
                document.querySelector('.trip-cart-section').innerHTML += `
                <div class = "trip-cart">${data.carts[i].departure} > ${data.carts[i].arrival}</div>
                <div class = "hour-cart">${data.carts[i].date.slice(11, 16)}</div>
                <div class = "price-cart">${data.carts[i].price}€</div>
                <div class = "delete-cart"><button id="btn-delete"> x </button></div>
                `; 
                //mettre le titre My cart
                document.querySelector('#text-cart').innerHTML =
                `
                <p>My Cart</p>
                
                `
                //le montan total du panier
                document.querySelector('#summarize-cart').innerHTML =
                `
                <div id = "total-cart">Total : ${data.carts[i].price}</div>
                <div id = "purchase-cart">
                    <button>Purchase</button>
                </div>
                
                `
            }
        }
    })

// bouton supprimer
