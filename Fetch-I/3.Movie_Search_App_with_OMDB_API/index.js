const InputMovies = document.getElementById('moviesInp');
const SearchBtn = document.getElementById('SearchBtn');
const mainDiv = document.querySelector('.movies');

function DisplayMovies(movie) {
    mainDiv.innerHTML = '';

    const movieDiv = document.createElement('div');
    movieDiv.className = 'MoviesDiv';

    const title = document.createElement('p');
    title.textContent = `Movie Title: ${movie.Title}`;
    const year = document.createElement('p');
    year.textContent = `Released Year: ${movie.Year}`;
    const poster = document.createElement('img');
    poster.src = movie.Poster;
    poster.alt = `${movie.Title}'s poster`;
    const plot = document.createElement('p');
    plot.textContent = `Movie Plot: ${movie.Plot}`;

    movieDiv.append(poster, title, year, plot);
    mainDiv.append(movieDiv);
}

async function FetchingMovies() {
    const movieTitle = InputMovies.value;

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=3c81e691`);
        const data = await response.json();
        console.log(data);
        DisplayMovies(data);
    } catch (error) {
        console.log('Something Went Wrong', error);
    }
}

SearchBtn.addEventListener('click', FetchingMovies);
