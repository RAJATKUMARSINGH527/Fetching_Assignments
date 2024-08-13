searchBtn = document.getElementById("search-btn")
searchbox = document.getElementById("search-box")
moviecard = document.getElementById("movie")


const displayMovies = (el) => {  
    moviecard.innerHTML = "";
    moviecard.innerHTML =
        `
            <p class="title">Title :- ${el.Title}</p>
            <p class="releaseYear">Year :- ${el.Year}</p>
            <p class="plot">Plot:- ${el.Plot}</p>
            <img class="poster" src="${el.Poster}" alt="Poster Not Found">
        `
}


const fetchMoviesBySearch = async (e) => {
    e.preventDefault()
    const Searchtext = searchbox.value;
    searchbox.value=""
    if (!Searchtext){
        alert("Search box can't be empty");
        return
    }
    try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=6d39f822&t=${Searchtext}`);
        const data = await res.json();
        if (data.Response == "False"){
            alert("Movie Not Found")
            return;
        }
        displayMovies(data);
       
    }
    catch (err) {
        console.log("Error in Fetch movie by search function",err)
    }
   
}
searchBtn.addEventListener("click",fetchMoviesBySearch)