const sb = document.querySelector('#search-button');
const n = document.querySelector('.navbar');
const sbar = document.querySelector('.search-bar');
const sinp = document.querySelector('#search-input');
const title = document.querySelector('.navbar .title-text');
const searchType = document.querySelector('#search-type');

var searchOn = false;
function searchSwitch() {searchOn = !searchOn}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function off() {
    title.classList.remove('off');
    sb.classList.remove('off');
    sinp.blur();
    sbar.classList.add('off');
    sbar.classList.remove('active');
    searchSwitch();
}
sb.addEventListener('click', () => {
    if(!searchOn) {
        title.classList.add('off');
        sb.classList.add('off');
        sbar.classList.add('active');
        sbar.classList.remove('off');
        searchSwitch();
        sleep(500).then(() => {
            sinp.focus();
        });
    }
});
document.addEventListener('click', (event) => {
    if(event.target !== sb && !sinp.contains(event.target) && event.target != searchType) {
        if(searchOn) {
            off();
            return;
        }
    } 
});
document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape') {
        off();
    }
});