const sBarValue = document.querySelector('#search-input');
const sType = document.querySelector('#search-type');

function filterSilamena(arr, init) {
    const searchTermLower = init.toLowerCase();
    return arr.filter(obj => obj.name.toLowerCase().startsWith(searchTermLower));
}
function filterEnglish(arr, init) {
    const searchTermLower = init.toLowerCase();
    return arr.filter(obj => {
        return(obj.english.startsWith(searchTermLower) || obj.english.includes(`, ${searchTermLower}`) || obj.english.includes(`/${searchTermLower}`));
    });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

sinp.addEventListener('input', async (e) => {
    let filteredWords;
    if(sinp.value) {
        switch (sType.value) {
            case 'silamena':
                filteredWords = await filterSilamena(inWords, sinp.value);
                break;
            case 'english':
                filteredWords = await filterEnglish(inWords, sinp.value);
                break;
            default:
                filteredWords = inWords;
                break;
        }
        initLoading(filteredWords);
    } else {
        initLoading(inWords);
    }
});