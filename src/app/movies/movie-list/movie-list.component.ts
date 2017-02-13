import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  filteredMovies: Movie[];
  selectedMovie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  filterMovies(value) {
    if ( ! value ) {
      this.filteredMovies = this.movies;
    }
    else {
      this.filteredMovies = Object.assign([], this.movies).filter(
        movie => movie.title.toLowerCase().indexOf(value.toLowerCase()) > -1
      )
    }

  }

  getMovies() {
    this.movieService
      .getMovies()
      .then((movies: Movie[]) => {
        this.movies = movies.map((movie) => {
          return movie;
        });
        this.filteredMovies = this.movies;
      });
  }

  private getIndexOfMovie = (id: String) => {
    return this.movies.findIndex((movie) => {
      return movie._id === id;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }

  createNewMovie() {
    let movie: Movie = {
      title: '',
      overview: '',
      released: 2017,
      rating: 1
    };

    // By default, a newly-created contact will have the selected state.
    this.selectMovie(movie);
  }

  deleteMovie = (id: String) => {
    let idx = this.getIndexOfMovie(id);
    if (idx !== -1) {
      this.movies.splice(idx, 1);
      this.selectMovie(null);
    }
    return this.movies;
  }

  addMovie = (movie: Movie) => {
    this.movies.push(movie);
    this.selectMovie(movie);
    return this.movies;
  }

  updateMovie = (movie: Movie) => {
    let idx = this.getIndexOfMovie(movie._id);
    if (idx !== -1) {
      this.movies[idx] = movie;
      this.selectMovie(movie);
    }
    return this.movies;
  }

}
