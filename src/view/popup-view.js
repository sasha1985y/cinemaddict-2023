import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const today = new Date();

const getCommentsDateInfo = (date) => {
  const letIntArr = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const differencial = Math.floor(((today - new Date(date)) / 1000) / 86400);
  if (differencial === '0') {
    return 'Today';
  } else if (differencial === '1') {
    return 'Yesterday';
  } else if (differencial !== '0' | '1' && differencial in letIntArr) {
    return `${differencial} days ago`;
  } else {
    return dayjs(date).format('YYYY/MM/DD HH:mm');
  }
};

const renderCurrentComments = (contentComments, movie) => {
  let listComments = '';
  const currentCommentArray = [];
  for (let i = 0; i < contentComments.length; i++) {
    const element = contentComments[i];
    for (let j = 0; j < movie.comments.length; j++) {
      const movieCommentId = movie.comments[j];
      if (element.id === movieCommentId) {
        currentCommentArray.push(element);
      }
    }
  }

  currentCommentArray.map((comment) => {
    const {emotion, author, date} = comment;
    listComments +=
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentsDateInfo(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  });
  return listComments;
};


const getDetalizedTime = (duration) => {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  if (hours === 0) {
    return `${minutes}m`;
  }else if (minutes === 0) {
    return `${hours}h`;
  } return `${hours}h ${minutes}m`;
};

const renderCurrentGenres = (genre) => {
  let listGenres = '';
  genre.map((item) => {
    listGenres += `<span class="film-details__genre">${item}</span>`;
  });

  return listGenres;
};

const renderCurrentGenreTitle = (genre) => {
  if (genre.length === 1) {
    return 'Genre';
  } return 'Genres';
};

const renderCurrentInfo = (writers, actors, date, duration, releaseCountry, genre) => (
  `<table class="film-details__table">
    <tr class="film-details__row">
      <td class="film-details__term">Director</td>
      <td class="film-details__cell">${writers[0]}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Writers</td>
      <td class="film-details__cell">${writers}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Actors</td>
      <td class="film-details__cell">${actors}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Release Date</td>
      <td class="film-details__cell">${dayjs(date).format('DD MMMM YYYY')}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Duration</td>
      <td class="film-details__cell">${getDetalizedTime(duration)}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">Country</td>
      <td class="film-details__cell">${releaseCountry}</td>
    </tr>
    <tr class="film-details__row">
      <td class="film-details__term">${renderCurrentGenreTitle(genre)}</td>
      <td class="film-details__cell">
        ${renderCurrentGenres(genre)}
      </td>
    </tr>
  </table>`
);


const createPopupViewTemplate = (contentComments, movie) => {
  const {comments, filmInfo, userDetails} = movie;
  const {watchlist, alreadyWatched, favorite} = userDetails;
  const {release, title, totalRating, duration, genre, poster, description, writers, actors} = filmInfo;
  const {date, releaseCountry} = release;

  const popupWatchlistClassName = watchlist
    ? 'film-details__control-button film-details__control-button--active film-details__control-button--watchlist'
    : 'film-details__control-button film-details__control-button--watchlist';

  const popupAlreadyWatchedClassName = alreadyWatched
    ? 'film-details__control-button film-details__control-button--active film-details__control-button--watched'
    : 'film-details__control-button film-details__control-button--watched';

  const popupFavoriteClassName = favorite
    ? 'film-details__control-button film-details__control-button--active film-details__control-button--favorite'
    : 'film-details__control-button film-details__control-button--favorite';

  return (

    `<section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="">
  
              <p class="film-details__age">18+</p>
            </div>
  
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>
  
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>
  
              ${renderCurrentInfo(writers, actors, date, duration, releaseCountry, genre)}
  
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
  
          <section class="film-details__controls">
            <button type="button" class="${popupWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="${popupAlreadyWatchedClassName}" id="watched" name="watched">Already watched</button>
            <button type="button" class="${popupFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
  
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
  
            <ul class="film-details__comments-list">${renderCurrentComments(contentComments, movie)}</ul>
  
            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label"></div>
  
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
  
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
  
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>`
  );
};
export default class PopupView extends AbstractView{

  #contentComments = null;
  #movie = null;
  #handleCloseBtnClick = null;
  #handleWatchlistClick = null;
  #handleHistoryClick = null;
  #handleFavoriteClick = null;

  constructor({contentComments, movie, onCloseBtnClick, onWatchlistClick, onHistoryClick, onFavoriteClick}) {
    super();
    this.#contentComments = contentComments;
    this.#movie = movie;
    this.#handleCloseBtnClick = onCloseBtnClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleHistoryClick = onHistoryClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeBtnClickHandler);

    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#movieWatchlistClickHandler);

    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#movieHistoryClickHandler);

    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#movieFavoriteClickHandler);
  }

  get template() {
    return createPopupViewTemplate(this.#contentComments, this.#movie);
  }

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseBtnClick();
    document.body.classList.remove('hide-overflow');
  };

  #movieWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
    evt.target.classList.toggle('film-details__control-button--active');
    document.querySelector(`.${this.#movie.id}`)
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .classList.toggle('film-card__controls-item--active');
  };

  #movieHistoryClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleHistoryClick();
    evt.target.classList.toggle('film-details__control-button--active');
    document.querySelector(`.${this.#movie.id}`)
      .querySelector('.film-card__controls-item--mark-as-watched')
      .classList.toggle('film-card__controls-item--active');
  };

  #movieFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
    evt.target.classList.toggle('film-details__control-button--active');
    document.querySelector(`.${this.#movie.id}`)
      .querySelector('.film-card__controls-item--favorite')
      .classList.toggle('film-card__controls-item--active');
  };
}
