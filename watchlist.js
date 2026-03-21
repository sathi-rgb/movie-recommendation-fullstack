const container = document.getElementById("watchlist-container")

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

if (watchlist.length === 0) {
    container.innerHTML = "<h2 style='color:white;'>No movies in watchlist 😢</h2>"
} else {
    watchlist.forEach(movie => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
            </div>
            <button class="remove-btn">❌ Remove</button>
        `

        movieEl.querySelector(".remove-btn").addEventListener("click", () => {
            removeFromWatchlist(movie.id)
        })

        container.appendChild(movieEl)
    })
}

function removeFromWatchlist(id) {
    watchlist = watchlist.filter(movie => movie.id !== id)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    location.reload()
}
