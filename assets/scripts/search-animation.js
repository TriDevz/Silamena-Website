const sb = document.querySelector('#search-button');
const n = document.querySelector('.navbar');
const sbar = document.querySelector('.search-bar');
const bb = document.querySelector('#back-button');
const inp = document.querySelector('#search-input');
const title = document.querySelector('.navbar .title-text h1');
const wsb = document.querySelector('#word-switch-button');

var searchOn = false;
function searchSwitch() {searchOn = !searchOn}

function off() {
    title.classList.remove('off');
    sb.classList.remove('off');
    sbar.classList.add('off');
    wsb.classList.remove('off');
    sbar.classList.remove('active');
    searchSwitch();
}

sb.addEventListener('click', () => {
    if(!searchOn) {
        title.classList.add('off');
        sb.classList.add('off');
        sbar.classList.add('active');
        sbar.classList.remove('off');
        wsb.classList.add('off');
        searchSwitch();
    }
});
bb.addEventListener('click', () => {
    if(searchOn) {
        off();
        return;
    }
});
document.addEventListener('click', (event) => {
    if(event.target !== sb && !n.contains(event.target)) {
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