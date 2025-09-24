//récupérer les éléments présents dans le cart 
console.log("hello")

fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(data => {
        const total = data.carts.reduce((acc, item) => acc + item.price,0)
        if(data.carts){
            for (let i = 0 ; i < data.carts.length; i++) {
                //mettre le titre My cart
                document.querySelector('#text-cart').innerHTML = `
                <p>My Cart</p>
                `;
                //récupère les éléments dans carts
                document.querySelector('.trip-cart-section').innerHTML += `
                <div class = "trip-cart">${data.carts[i].departure} > ${data.carts[i].arrival}</div>
                <div class = "hour-cart">${data.carts[i].date.slice(11, 16)}</div>
                <div class = "price-cart">${data.carts[i].price}€</div>
                <div class = "delete-cart"><button id="${data.carts[i]._id}"> x </button></div>
                `; 
                
                console.log(data.carts[i]._id)
                
                
                //le montant total du panier
                document.querySelector('#summarize-cart').innerHTML =
                `
                <div id = "total-cart">Total : ${total}€</div>
                <div>
                    <button id = "purchase-cart">Purchase</button>
                </div>
                `;clickPurchase()
            }
              // bouton supprimer
            for (let i=0 ; i < document.querySelectorAll('.delete-cart').length; i++){
                document.querySelectorAll('button')[i].addEventListener('click', function () {
                fetch(`http://localhost:3000/carts/${this.id}`, {method : "DELETE"})
                .then (response => response.json())
                .then (data => {
                    if (data.result){
                        this.parentNode.parentNode.remove();
                        
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


