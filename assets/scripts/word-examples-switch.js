wsb.src = 'assets/images/word.png';
wsb.title = 'Switch to examples';

let wordBool = true;

wsb.addEventListener('click', () => {
    if(wordBool) {
        wsb.src = 'assets/images/example.png'
        wsb.title = 'Switch to words'
        wordBool = !wordBool;
    } else {
        wsb.src = 'assets/images/word.png'
        wsb.title = 'Switch to examples'
        wordBool = !wordBool;
    }
});