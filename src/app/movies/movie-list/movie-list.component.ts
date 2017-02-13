import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import 'rxjs/add/operator/map';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService]
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  selectedMovie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService
      .getMovies()
      .then((movies: Movie[]) => {
        this.movies = movies.map((movie) => {
          return movie;
        });
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
      rating: 0
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
