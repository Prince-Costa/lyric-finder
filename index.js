document.getElementById('srcBtn').addEventListener('click', () => {
    const inputValue = document.getElementById('input-box').value;
    getResult(inputValue);
})

function getResult(inputValue) {
    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
        .then(response => response.json())
        .then(receivedData => showResults(receivedData))
}

function showResults(receivedData) {
    const loadData = receivedData.data;
    for (let i = 0; i < loadData.length; i++) {
        const element = loadData[i];
        const title = element.title;
        const mainDiv = document.getElementById('main');
        const searchResultDiv = document.createElement('div');
        searchResultDiv.innerHTML = ` 
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-4">
                <img src="${element.artist.picture_small}" alt="">
            </div>
            <div class="col-md-5">
                <h3 class="lyrics-name">${element.title}</h3>
                <p class="author lead">Album by <span>${element.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="getLyric(${title})">Get Lyrics</button>
            </div>
         </div>`;
         mainDiv.appendChild(searchResultDiv);
    }
}

// https://api.lyrics.ovh/v1/Justin%20Bieber/Baby

function getLyric(title){
    const data = title;
    console.log(data);

}