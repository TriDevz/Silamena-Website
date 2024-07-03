const loading = document.querySelector("#loading");
const container = document.querySelector(".main-container");
const loadCount = 4;
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
    const currentTime = Date.now();

    if (currentTime - lastScrollTime >= 50) {
        const isScrolledBeyondThreshold = loading.getBoundingClientRect().top < window.innerHeight+100;
        if(isScrolledBeyondThreshold) {
            if(loaded < totalWords) {
                loadIndex++;
                load(loadIndex*loadCount)
                lastScrollTime = currentTime;
            }
        }
    }
});

function load(index) {
    let tempArr = Words.slice(index, index+loadCount);

    loaded += tempArr.length;
    
    tempArr.forEach(word => {
        const wordContainer = document.createElement("div");
        wordContainer.classList.add("word-container");
        wordContainer.setAttribute("onclick", `window.location.href = '/word/${word.name}'`);
        const wordImage = document.createElement("div");
        wordImage.classList.add("word-image");
        const imageElement = document.createElement("img");
        imageElement.title = roles[word.role];
        imageElement.src = `assets/images/roles/${word.role}.png`;
        wordImage.appendChild(imageElement);
        wordContainer.appendChild(wordImage);
        const wordInfo = document.createElement("div");
        wordInfo.classList.add("word-info");
        const wordTitle = document.createElement("div");
        wordTitle.classList.add("word-title");
        const titleElement = document.createElement("h1");
        titleElement.textContent = word.name;
        const arrowElement = document.createElement("img");
        arrowElement.src = "assets/images/right-arrow.png";
        const wordEnglish = document.createElement("h2");
        wordEnglish.textContent = word.english;
        wordTitle.appendChild(titleElement);
        wordTitle.appendChild(arrowElement);
        wordInfo.appendChild(wordTitle);
        wordTitle.appendChild(wordEnglish);
        wordContainer.appendChild(wordInfo);
        container.appendChild(wordContainer);
    });
}
