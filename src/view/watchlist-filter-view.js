import AbstractView from '../framework/view/abstract-view.js';

const createWatchlistFilterTemplate = (movies) => `<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.watchlist === true).length}</span></a>`;

export default class WatchlistFilterView extends AbstractView {

  #movies = null;
  #handleWatchlistFilterClick = null;

  constructor({ movies, onWatchlistFilterClick }) {
    super();
    this.#movies = movies;
    this.#handleWatchlistFilterClick = onWatchlistFilterClick;

    this.element.addEventListener('click', this.#watchlistFilterHandler);
  }

  get template() {
    return createWatchlistFilterTemplate(this.#movies);
  }

  #watchlistFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistFilterClick();
    document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
    this.element.classList.add('main-navigation__item--active');
  };
}
