require('dotenv').config();
const apiKey = process.env.API_KEY;
const N_key = process.env.N_KEY;

// on page loading, hide the spline container and show the main content
window.addEventListener('load', () => {
    const splineContainer = document.getElementById('spline-container');
    const mainContent = document.getElementById('main-content');

 
    splineContainer.style.opacity = 0;

    
    setTimeout(() => {
        splineContainer.style.display = 'none'; 
        mainContent.style.display = 'block'; 
        mainContent.style.opacity = 1; 
    }, 1000); 
});
// fetchAirports (function) to fetch airports by keyword
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}


const fetchAirports = debounce(async function(dropdownId, keywordId) {

    const keyword = document.getElementById(keywordId).value;
    const dropdown = document.getElementById(dropdownId);

    dropdown.innerHTML = '<option value="">Select an airport</option>';

    if (keyword.length === 0) return;

    const url = `https://carbonsutra1.p.rapidapi.com/airports-by-keyword?keyword=${keyword}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'carbonsutra1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        
        if (data.success) {
            data.data.forEach(airport => {
                const option = document.createElement('option');
                option.value = airport.iata_code;
                option.textContent = `${airport.airport_name} (${airport.iata_code})`;
                dropdown.appendChild(option);
            });
        } else {
            console.error('API request failed with status:', data.status);

        }
    } catch (error) {
        console.error(error);
    }


   
},500
);
document.getElementById('searchKeyword1').addEventListener('input', function() {
    fetchAirports('airportDropdown1', 'searchKeyword1');
});
let airportCode1 = '';
let airportCode2 = '';


document.getElementById('airportDropdown1').addEventListener('change', (event) => {
    airportCode1 = event.target.value;
    
});


document.getElementById('airportDropdown2').addEventListener('change', (event) => {
    airportCode2 = event.target.value;
    
});


const submitBtn = document.querySelector('.btn');
const distance = document.querySelector('.distance')
const flightClassDropdown = document.getElementById('additionalSelect1');
const container =document.querySelector('.container')
const card_text = document.querySelector('.card-text')
let selectedValue = '';
flightClassDropdown.addEventListener('change', (event) => {
    
     selectedValue = event.target.value;
    
});

// estimate button 
submitBtn.addEventListener('click', () => {

    
    const splineContainer = document.getElementById('spline-container');
    
    setTimeout(() => {
        container.classList.add('remove')
        splineContainer.style.opacity = 1;
        splineContainer.style.display = 'flex';
    }, 500); 
    

    const url = 'https://carbonsutra1.p.rapidapi.com/flight_estimate';     
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'carbonsutra1.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${N_key}`
        },
        body: new URLSearchParams({
            iata_airport_from: airportCode1,
            iata_airport_to: airportCode2,
            flight_class: selectedValue,
            number_of_passengers: distance.value
        })
    };
    
    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const estimate_in_kg = result.data.co2e_kg;
            card_text.innerHTML = `<p class="card-text"><h3>${estimate_in_kg}! kg</h3></p>`

            
            if (result.success===true){
                const output =document.getElementById('resultCard')
                splineContainer.style.opacity = 0;
                   setTimeout(() => {
                       splineContainer.style.display = 'none'; 
                       output.style.display = 'block'; 
                       output.style.opacity = 1; 
                       output.classList.add('result-card')
                   }, 1000);
               
            }else{
                const output =document.getElementById('resultCard')
                splineContainer.style.opacity = 0;
                   setTimeout(() => {
                       splineContainer.style.display = 'none'; 
                       output.style.display = 'block'; 
                       output.style.opacity = 1; 
                       output.classList.add('result-card')
                        card_text.innerHTML = `<p class="card-text"><h3> Something went wrong!</h3></p>`
                   }, 1000);
            }
        } catch (error) {
            
            console.error(error);
        }
    }

    fetchData()

});
// reload page 
function reloadPage() {
    location.reload();
}



