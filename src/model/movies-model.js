export default class MoviesModel {
  #moviesArray = null;

  constructor(movieArr) {
    this.#moviesArray = movieArr;
  }

  get movies() {
    return this.#moviesArray;
  }
}
