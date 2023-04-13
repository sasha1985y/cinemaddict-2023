import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate = (movies) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active" id="all">All movies</a>
    <a href="#watchlist" class="main-navigation__item" id="watchlist">Watchlist<span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.watchlist === true).length}</span></a>
    <a href="#history" class="main-navigation__item" id="history">History <span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.alreadyWatched === true).length}</span></a>
    <a href="#favorites" class="main-navigation__item" id="favorites">Favorites <span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.favorite === true).length}</span></a>
  </nav>`
);

export default class FiltersView extends AbstractView {

  #movies = null;
  #handleAllMoviesFilterClick = null;
  #handleWatchlistFilterClick = null;
  #handleHistoryFilterClick = null;
  #handleFavoritesFilterClick = null;

  constructor({
    movies,
    onAllMoviesFilterClick,
    onWatchlistFilterClick,
    onHistoryFilterClick,
    onFavoritesFilterClick
  }) {
    super();
    this.#movies = movies;
    this.#handleAllMoviesFilterClick = onAllMoviesFilterClick;
    this.#handleWatchlistFilterClick = onWatchlistFilterClick;
    this.#handleHistoryFilterClick = onHistoryFilterClick;
    this.#handleFavoritesFilterClick = onFavoritesFilterClick;

    this.element.querySelectorAll('a')[0]
      .addEventListener('click', this.#allMoviesFilterHandler);
    this.element.querySelectorAll('a')[1]
      .addEventListener('click', this.#watchlistMoviesFilterHandler);
    this.element.querySelectorAll('a')[2]
      .addEventListener('click', this.#historyMoviesFilterHandler);
    this.element.querySelectorAll('a')[3]
      .addEventListener('click', this.#favoriteMoviesFilterHandler);
  }

  get template() {
    return createFiltersTemplate(this.#movies);
  }

  #allMoviesFilterHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this.#handleAllMoviesFilterClick(evt.target.id);
    }
    this.element.querySelector('.main-navigation__item--active')
      .classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
  };

  #watchlistMoviesFilterHandler = (evt) => {
    evt.preventDefault();
    if(evt.target.tagName === 'A') {
      this.#handleWatchlistFilterClick(evt.target.id);
    }
    this.element.querySelector('.main-navigation__item--active')
      .classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
  };

  #historyMoviesFilterHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this.#handleHistoryFilterClick(evt.target.id);
    }
    this.element.querySelector('.main-navigation__item--active')
      .classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
  };

  #favoriteMoviesFilterHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this.#handleFavoritesFilterClick(evt.target.id);
    }
    this.element.querySelector('.main-navigation__item--active')
      .classList.remove('main-navigation__item--active');
    evt.target.classList.add('main-navigation__item--active');
  };
}
