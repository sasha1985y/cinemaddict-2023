import AbstractView from '../framework/view/abstract-view.js';

const createAllMoviesFilterTemplate =
() => (
  '<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>'
);

export default class AllMoviesFilterView extends AbstractView {

  #handleAllMoviesFilterClick = null;

  constructor({ onAllMoviesFilterClick }) {
    super();
    this.#handleAllMoviesFilterClick = onAllMoviesFilterClick;

    this.element.addEventListener('click', this.#allMoviesFilterHandler);
  }

  get template() {
    return createAllMoviesFilterTemplate();
  }

  #allMoviesFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleAllMoviesFilterClick();
    document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
    this.element.classList.add('main-navigation__item--active');
  };
}
