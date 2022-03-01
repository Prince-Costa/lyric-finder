let lyricField = document.getElementById('lyricField');

document.getElementById('srcBtn').addEventListener('click', () => {
    const inputValue = document.getElementById('input-box').value;
    getResult(inputValue);
})

function getResult(inputValue) {
    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
        .then(response => response.json())
        .then(receivedData => {
            showResults(receivedData);
            console.log(receivedData);
        })
}

function showResults(receivedData) {

    const loadData = receivedData.data;
    let results = document.getElementById('results');
    results.innerHTML = " ";
    lyricField.innerHTML = " ";

    for (let i = 0; i < loadData.length; i++) {
        const element = loadData[i];
        const title = element.title;
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
                <button class="btn btn-success" onclick="getLyric('${element.title}', '${element.artist.name}')">Get Lyrics</button>
            </div>
         </div>`;
        results.appendChild(searchResultDiv);
    }
}


function getLyric(title, artist) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(response => response.json())
        .then(receivedData => {
            if (receivedData.hasOwnProperty('error')) {
                showError()
            } else {
                const lyricDetails = `${title} by  ${artist}`;
                showLyric(receivedData, lyricDetails)
            }
        }
        )
        .catch(error => {
            console.error('There was an error!', error)

        })

}

function showLyric(receivedData, lyricDetails) {
    lyricField.innerHTML = " ";
    let lyricDiv = document.createElement("div");
    console.log(receivedData);
    let lyric = receivedData.lyrics;
    console.log(lyric);
    lyricField.innerHTML = `<h3>${lyricDetails}</h3></br>`;
    lyricDiv.innerText = lyric;
    lyricField.appendChild(lyricDiv);
}

function showError(){
    lyricField.innerHTML = " ";
    lyricField.innerHTML = `<h3>No lyric found</h3>`;
}