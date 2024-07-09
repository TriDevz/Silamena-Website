const loading = document.querySelector("#loading");
const container = document.querySelector(".main-container");
const loadCount = 16;
let loaded = 0;
let loadIndex;
let Words = [];
let totalWords;

function initLoading(arr) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    loaded = 0;
    loadIndex = 0;
    Words = arr.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
    totalWords = Words.length;
    load(0);
}



let lastScrollTime = 0;



window.addEventListener("scroll", () => {
    const isScrolledBeyondThreshold = loading.getBoundingClientRect().top < window.innerHeight+100;
    if(isScrolledBeyondThreshold) {
        if(loaded < totalWords) {
            loadIndex++;
            load(loadIndex*loadCount);
        }
    }
});

function load(index) {
    if(Words[0] === 'nope') {
        console.log("api not reachable");
        document.querySelector('.center h1').innerHTML = "API not reachable :'("
        document.querySelector('#loading-text').innerHTML = "API not reachable :'("
        document.querySelector('.add-container').style.display = 'none';
        document.querySelector('#loading').src = 'assets/images/gifs/failed.gif';
        return 1;
    }

    let tempArr = Words.slice(index, index+loadCount);
    loaded += tempArr.length;
    document.querySelector('#count-info h3').innerHTML = `Loaded words: ${loaded} / ${totalWords}`
    
    if(loaded == totalWords) {
        document.querySelector('#loading').style.display = 'none';
         document.querySelector('#loading-text').innerHTML = "That's all :' )"
    }

    tempArr.forEach(word => {
        const wordContainer = document.createElement("div");
        wordContainer.classList.add("word-container");
        const wordImage = document.createElement("div");
        wordImage.classList.add("word-image");
        const imageElement = document.createElement("img");
        imageElement.title = roles[word.role];
        imageElement.src = `assets/images/roles/${word.role}.png`;
        wordImage.appendChild(imageElement);
        wordContainer.appendChild(wordImage);
        const wordInfo = document.createElement("div");
        wordInfo.classList.add("word-info");
        const wordButtons = document.createElement("div");
        wordButtons.classList.add("word-buttons");
        wordInfo.classList.add("word-info");
        const wordTitle = document.createElement("div");
        const deleteElement = document.createElement("img");
        deleteElement.src = 'assets/images/delete.png';
        const editElement = document.createElement("img");
        editElement.setAttribute("onclick", `window.location.href = '/edit/word/${word.name}'`);
        editElement.src = 'assets/images/edit.png';
        wordButtons.appendChild(editElement);
        wordButtons.appendChild(deleteElement);
        const arrowElement = document.createElement("img");
        arrowElement.src = "assets/images/right-arrow.png";
        wordTitle.classList.add("word-title");
        wordTitle.setAttribute("onclick", `window.location.href = '/word/${word.name}'`);
        deleteElement.setAttribute("onclick", `deleteConfirm("${word.name}");`);
        const titleElement = document.createElement("h1");
        titleElement.textContent = word.name;
        arrowElement.src = "assets/images/right-arrow.png";
        const wordEnglish = document.createElement("h2");
        wordEnglish.textContent = word.english;
        wordTitle.appendChild(titleElement);
        wordTitle.appendChild(arrowElement);
        wordInfo.appendChild(wordTitle);
        wordTitle.appendChild(wordEnglish);
        wordContainer.appendChild(wordInfo);
        wordContainer.appendChild(wordButtons);
        container.appendChild(wordContainer);
    });
}
