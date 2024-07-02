const sBarValue = document.querySelector('#search-input');

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('keydown', async (e) => {
    if(e.key == 'Enter') {
        if(searchOn) {
            if(sBarValue.value) window.location.href = '/word/' + capitalizeFirstLetter(sBarValue.value);
        }
    }
});