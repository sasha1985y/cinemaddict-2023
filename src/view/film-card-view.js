import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const renderShortDescription = (description) => {
  let shortDescription = '';
  if (description.length >= 25) {
    shortDescription = description.slice(0, 24);
  }
  return `${shortDescription}...`;
};

const createFilmCardTemplate = (movie) => {
  const {id, comments, filmInfo, userDetails} = movie;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const {release, title, totalRating, duration, genre, poster, description} = filmInfo;
  const {date} = release;

  const watchlistClassName = watchlist
    ? 'film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item film-card__controls-item--add-to-watchlist';

  const alreadyWatchedClassName = alreadyWatched
    ? 'film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item film-card__controls-item--mark-as-watched';

  const favoriteClassName = favorite
    ? 'film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item film-card__controls-item--favorite';

  return (
    `<article class="film-card ${id}">
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
        <button class="${watchlistClassName}" type="button">Add to watchlist</button>
        <button class="${alreadyWatchedClassName}" type="button">Mark as watched</button>
        <button class="${favoriteClassName}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  #movie = null;
  #handleMovieClick = null;
  #handleWatchlistClick = null;
  #handleHistoryClick = null;
  #handleFavoriteClick = null;

  constructor({movie, onMovieClick, onWatchlistClick, onHistoryClick, onFavoriteClick}) {
    super();
    this.#movie = movie;
    this.#handleMovieClick = onMovieClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleHistoryClick = onHistoryClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#movieClickHandler);

    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#movieWatchlistClickHandler);

    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#movieHistoryClickHandler);

    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#movieFavoriteClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  #movieClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleMovieClick();
    document.body.classList.add('hide-overflow');
  };

  #movieWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };

  #movieHistoryClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleHistoryClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };

  #movieFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
    evt.target.classList.toggle('film-card__controls-item--active');
  };
}
