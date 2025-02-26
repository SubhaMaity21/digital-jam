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