const API_URL='https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=cc4cd8667a15f81b0fc1b383752eb090&page=1'
const IMG_PATH='https://image.tmdb.org/t/p/w1280'
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=cc4cd8667a15f81b0fc1b383752eb090&query="'
const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')
let currentMovieId = null
let currentMovieTitle = ""
let currentMoviePoster = ""
const chatbotBtn = document.getElementById("chatbot-button")
const chatbotBox = document.getElementById("chatbot-container")

chatbotBtn.onclick = toggleChat
getMovies(API_URL)
async function getMovies(url) {
    const res=await fetch(url)
    const data=await res.json()
    showMovies(data.results)

}
function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {

        const { id, title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        
movieEl.innerHTML = `
    <div class="img-container">
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="rating-badge ${getClassByRate(vote_average)}">
            ${to2SigFigs(vote_average)}
        </div>
    </div>
    
    <div class="movie-info">
        <h3>${title}</h3>
    </div>

    <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>

    <button class="watch-btn">+ Watchlist</button>
`


const watchBtn = movieEl.querySelector('.watch-btn')

watchBtn.addEventListener('click', (e) => {
    e.stopPropagation() 
    addToWatchlist(movie)
})

        movieEl.addEventListener('click', () => {
            getMovieDetails(id)
        })

        main.appendChild(movieEl)
    })
}
async function getMovieDetails(movieId) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=cc4cd8667a15f81b0fc1b383752eb090&append_to_response=videos`
    )

    const data = await res.json()
currentMovieId = movieId
currentMovieTitle = data.title
currentMoviePoster = IMG_PATH + data.poster_path
    const trailer = data.videos.results.find(
        vid => vid.type === "Trailer" && vid.site === "YouTube"
    )

    const trailerEmbed = trailer
        ? `<iframe width="100%" height="400"
            src="https://www.youtube.com/embed/${trailer.key}"
            frameborder="0" allowfullscreen></iframe>`
        : "<p>No trailer available</p>"

    document.getElementById('modalTitle').innerText = data.title

    document.getElementById('modalContent').innerHTML = `
        <p><strong>Release Date:</strong> ${data.release_date}</p>
        <p><strong>Runtime:</strong> ${data.runtime} mins</p>
        <p><strong>Genres:</strong> ${data.genres.map(g => g.name).join(", ")}</p>
        <p>${data.overview}</p>
        <hr>
        ${trailerEmbed}
    `

    const modal = new bootstrap.Modal(
        document.getElementById('movieModal')
    )
    modal.show()
}

function to2SigFigs(n) {
    if (n === 0) return 0;
    let rounded = Number(n.toPrecision(2));
    return rounded % 1 === 0 ? rounded.toFixed(1) : rounded;
}
function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }
    else if(vote>=5){
        return 'orange'
    }
    else{
    return 'red'
}}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchTerm=search.value
if(searchTerm && searchTerm!=''){
    getMovies(SEARCH_URL + searchTerm)
    search.value=''
}else{
    window.location.reload()
}
})
function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

    const exists = watchlist.find(item => item.id === movie.id)

    if (!exists) {
        watchlist.push(movie)
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
        alert("Added to Watchlist ❤️")
    } else {
        alert("Already in Watchlist 😅")
    }
}
async function checkReview(){

let review = document.getElementById("review").value;
document.getElementById("review").value = "";
let response = await fetch("http://127.0.0.1:5000/predict",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify({review:review})
});

let data = await response.json();

let sentiment = data.sentiment;

document.getElementById("sentimentResult").innerText =
"Sentiment: " + sentiment;

await saveReview(review, sentiment, currentMovieId);
await displayReviews(currentMovieId);
}
async function saveReview(review, sentiment, movieId){

await fetch("http://127.0.0.1:5000/reviews",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
movieTitle: currentMovieTitle,
poster: currentMoviePoster,
text: review,
sentiment: sentiment
})
})

}
async function displayReviews(movieId){

let res = await fetch("http://127.0.0.1:5000/reviews")

let reviews = await res.json()

let positiveList = document.getElementById("positiveReviews")
let negativeList = document.getElementById("negativeReviews")

positiveList.innerHTML = ""
negativeList.innerHTML = ""

reviews.forEach(r => {

if(r.movieTitle !== currentMovieTitle) return

let box = document.createElement("div")
box.className = "review-card"

box.innerHTML = `
<img class="poster" src="${r.poster}">
<div class="review-content">
<h3>${r.movieTitle}</h3>
<p>${r.text}</p>
</div>
`

if(r.sentiment === "positive"){
positiveList.appendChild(box)
}else{
negativeList.appendChild(box)
}

})

}
displayReviews();
function toggleChat(){
chatbotBox.style.display =
chatbotBox.style.display === "flex" ? "none" : "flex"
}

async function sendMessage(){

let input = document.getElementById("chatbot-input")
let message = input.value.trim()

if(message === "") return

let chat = document.getElementById("chatbot-messages")

// USER MESSAGE
chat.innerHTML += `
<div class="user-msg">
<b>You:</b> ${message}
</div>
`

input.value = ""

// BOT MESSAGE CONTAINER
let botMsg = document.createElement("div")
botMsg.className = "bot-msg"
botMsg.innerHTML = "<b>Bot:</b> "

chat.appendChild(botMsg)

// CALL FLASK API
const response = await fetch("http://127.0.0.1:5000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({message: message})
})

const reader = response.body.getReader()
const decoder = new TextDecoder()

let fullText = ""

// STREAM RESPONSE
while(true){

const {done,value} = await reader.read()

if(done) break

const chunk = decoder.decode(value)

fullText += chunk

// render markdown
botMsg.innerHTML = "<b>Bot:</b> " + marked.parse(fullText)

}

chat.scrollTop = chat.scrollHeight

}


function showMovieResults(movies){

let chat = document.getElementById("chatbot-messages")

movies.slice(0,3).forEach(movie=>{

chat.innerHTML += `
<div class="chat-movie">

<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}">

<div>
<h4>${movie.title}</h4>
⭐ ${movie.vote_average}
</div>

</div>
`

})
}