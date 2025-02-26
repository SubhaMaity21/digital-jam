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

const submitBtn = document.querySelector('.button');
const country = document.querySelector('.country');
const unitVal = document.querySelector('.elUnit');
const container = document.querySelector('.contain')
const card_text = document.querySelector('.card-text')
//  estimate button
submitBtn.addEventListener('click',()=>{
    const splineContainer = document.getElementById('spline-container');
    
    setTimeout(() => {
        container.classList.add('remove')
        splineContainer.style.opacity = 1;
        splineContainer.style.display = 'flex';
    }, 500); 
    
    const url = 'https://carbonsutra1.p.rapidapi.com/electricity_estimate';     
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'carbonsutra1.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer fQ98oU704xFvsnXcQLVDbpeCJHPglG1DcxiMLKfpeNEMGumlbzVf1lCI6ZBx`
        },
        body: new URLSearchParams({
            country_name: country.value,
            electricity_value:unitVal.value ,
            electricity_unit: 'kWh'
        })
    };
    
    async function fetchData() {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result.data.co2e_kg);
            
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
        }
    }
    
    fetchData();
    
})
//  reload page
function reloadPage() {
    location.reload();
}









