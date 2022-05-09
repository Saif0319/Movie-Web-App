const key = "d1e9fbeb728c3ff2af4f2058f3271af0";
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d1e9fbeb728c3ff2af4f2058f3271af0&page=1";

const img_path = "https://image.tmdb.org/t/p/w500"
const search_API = 'https://api.themoviedb.org/3/search/movie?api_key=d1e9fbeb728c3ff2af4f2058f3271af0&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



//get initial movies
getmovie(API_URL);


async function getmovie(url){
    const res = await fetch(url)
    const data = await res.json()
    
    showMovies(data.results)
}


function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movies")

        movieEl.innerHTML = `
        <img src="${img_path + poster_path}" alt="${title}">
        
        <div class="movie-info d-flex">
        <h3 class="title">${title}</h3>
        <span class=" rounded" style="color:${rateColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `

        main.appendChild(movieEl)
    })
}




function rateColor(rating){
    if (rating >= 8){
        return "aqua"
    } else if (rating >= 6) {
        return "gold"
    } else {
        return "orangered"
    }
}






form.addEventListener("submit", (e) => {
    e.preventDefault();

    const search_term = search.value;

    if(search_term && search_term !== ''){

        getmovie(search_API + search_term)

        search.value = "";
    } else {
        window.location.reload();
    }
})