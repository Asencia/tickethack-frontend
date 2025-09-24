console.log("hello")

fetch('http://localhost:3000/bookings')
    .then(response => response.json())
    .then (data => {
        if(data.bookedTrips){
            for (let i = 0 ; i < data.bookedTrips.length; i++){
                document.querySelector(".trip-booking-section").innerHTML += `
                <div class = "trip-booking">${data.bookedTrips[i].departure} > ${data.bookedTrips[i].arrival}</div>
                <div class = "hour-booking">${data.bookedTrips[i].date.slice(11, 16)}</div>
                <div class = "price-booking">${data.bookedTrips[i].price} €</div>
                <div class = "departure-booking">Depart dans 5 heures</div>
                
                ` 
                
                
            }
        }
    })



    