import AbstractView from '../framework/view/abstract-view.js';

const createFavoritesFilterTemplate = (movies) => `<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${movies.filter((movie) => movie.userDetails.favorite === true).length}</span></a>`;

export default class FavoritesFilterView extends AbstractView {

  #movies = null;
  #handleFavoritesFilterClick = null;

  constructor({ movies, onFavoritesFilterClick }) {
    super();
    this.#movies = movies;
    this.#handleFavoritesFilterClick = onFavoritesFilterClick;

    this.element.addEventListener('click', this.#favoritesFilterHandler);
  }

  get template() {
    return createFavoritesFilterTemplate(this.#movies);
  }

  #favoritesFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoritesFilterClick();
    document.querySelector('.main-navigation__item--active').classList.remove('main-navigation__item--active');
    this.element.classList.add('main-navigation__item--active');
  };
}
