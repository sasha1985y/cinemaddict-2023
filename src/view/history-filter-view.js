import AbstractView from '../framework/view/abstract-view.js';

const createHistoryFilterTemplate = (movies) => `<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.alreadyWatched === true).length}</span></a>`;


export default class HistoryFilterView extends AbstractView {

  #movies = null;
  #handleHistoryFilterClick = null;

  constructor({ movies, onHistoryFilterClick }) {
    super();
    this.#movies = movies;
    this.#handleHistoryFilterClick = onHistoryFilterClick;

    this.element.addEventListener('click', this.#historyFilterHandler);
  }

  get template() {
    return createHistoryFilterTemplate(this.#movies);
  }

  #historyFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleHistoryFilterClick();
    document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
    this.element.classList.add('main-navigation__item--active');
  };
}
