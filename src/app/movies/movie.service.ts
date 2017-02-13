import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MovieService {
  private endpoint = '/api/movies';

  constructor (private http: Http) {}

  // get("/api/movies")
  getMovies(): Promise<Movie[]> {
    return this.http.get(this.endpoint)
      .toPromise()
      .then(response => response.json() as Movie[])
      .catch(this.handleError);
  }

  // post("/api/movies")
  createMovie(movie: Movie): Promise<Movie> {
    return this.http.post(this.endpoint, movie)
      .toPromise()
      .then(response => response.json() as Movie)
      .catch(this.handleError);
  }

  // get("/api/movies/:id") endpoint not used by Angular app

  // delete("/api/movies/:id")
  deleteMovie(id: String): Promise<String> {
    return this.http.delete(this.endpoint + '/' + id)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/movies/:id")
  updateMovie(movie: Movie): Promise<Movie> {
    return this.http.put(`${this.endpoint}/${movie._id}`, movie)
      .toPromise()
      .then(response => response.json() as Movie)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
