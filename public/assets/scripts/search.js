const sBarValue = document.querySelector('#search-input');

function filter(arr, init) {
    const searchTermLower = init.toLowerCase();
    return arr.filter(obj => obj.name.toLowerCase().startsWith(searchTermLower));
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

sinp.addEventListener('input', async (e) => {
    if(sinp.value) {
        filteredWords = await filter(inWords, sinp.value);
        initLoading(filteredWords);
    } else {
        initLoading(inWords);
    }
});