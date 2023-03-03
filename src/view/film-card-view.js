import {createElement} from '../render.js';
import dayjs from 'dayjs';

const renderShortDescription = (description) => {
  let shortDescription = '';
  if (description.length >= 25) {
    shortDescription = description.slice(0, 24);
  }
  return `${shortDescription}...`;
};

const createFilmCardTemplate = (movie) => {
  const {comments, filmInfo} = movie;
  const {release, title, totalRating, duration, genre, poster, description} = filmInfo;
  const {date} = release;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${dayjs(date).format('YYYY')}</span>
          <span class="film-card__duration">${duration}m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${renderShortDescription(description)}</p>
        <span class="film-card__comments">${comments.length}comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard {
  #element = null;
  #movie = null;

  constructor({movie}) {
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
