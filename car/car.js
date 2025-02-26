const apiKey = 'e7c957a47fmshbb53361501347bcp1b09a2jsn09351a30b63a';

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

// fetch model of car by keyword
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const fetchModel = debounce(async function(dropdownId, keywordId) {
    const keyword = document.getElementById(keywordId).value;
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) {
        console.error('Dropdown element not found:', dropdownId);
        return; 
    }
    
    dropdown.innerHTML = '<option value="">Select a model</option>';

    if (keyword.length === 0) return;

    const url = `https://carbonsutra1.p.rapidapi.com/vehicle_makes/${keyword}/vehicle_models`;
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
        console.log(data);
        
        // Check if the API request was successful
        if (data.success) {
            data.data.forEach(model => {
                const option = document.createElement('option');
                option.value = model.model;
                option.textContent = model.model;
                dropdown.appendChild(option);
            });
        } else {
            console.error('API request failed with status:', data.status);
        }
    } catch (error) {
        console.error(error);
    }
}, 500); // 500 milliseconds delay

document.getElementById('searchKeyword1').addEventListener('input', function() {
    fetchModel('modelDropdown1', 'searchKeyword1');
});





let model = '';
const container =document.querySelector('.container')
const card_text = document.querySelector('.card-text')
document.getElementById('modelDropdown1').addEventListener('change', (event) => {
    model = event.target.value;
});
const searchInput = document.getElementById('searchKeyword1');
const button = document.querySelector('.btn');
const distance = document.getElementById('distance')

// estimate button
button.addEventListener('click',async ()=>{
    const splineContainer = document.getElementById('spline-container');
    
    setTimeout(() => {
        container.classList.add('remove')
        splineContainer.style.opacity = 1;
        splineContainer.style.display = 'flex';
    }, 500); 
    
    const url = 'https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_model';
    const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': apiKey,
		'x-rapidapi-host': 'carbonsutra1.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: `Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx`
	},
	body: new URLSearchParams({
		vehicle_make: searchInput.value,
		vehicle_model: model,
		distance_value: distance.value,
		distance_unit: 'km'
	})
};

async function fetchData() {
    
}

try {
    const response = await fetch(url, options);
    const result = await response.json();
    const estimate_in_kg = result.data.co2e_kg;
    card_text.innerHTML = `<p class="card-text"><h3>${estimate_in_kg}! kg</h3></p>`
    if (result.success===true){
        const result =document.getElementById('resultCard')
        setTimeout(() => {
            splineContainer.style.display = 'none'; 
            result.style.display = 'block'; 
            result.style.opacity = 1; 
            result.classList.add('result-card')
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
        console.log('error')
    }
	
} catch (error) {
	console.error(error);
};

fetchData()
})

// reload page
function reloadPage() {
    location.reload();
}