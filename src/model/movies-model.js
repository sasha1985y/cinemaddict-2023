import { movieArr } from '../mocks/mock-utils';

export default class MoviesModel {
  movies = movieArr;

  getMovies() {
    return this.movies;
  }
}
