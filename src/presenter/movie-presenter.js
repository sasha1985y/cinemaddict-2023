import { render, RenderPosition, remove, replace } from '../framework/render.js';
import FilmCard from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class MoviePresenter {
  #commonFilmsSection = null;
  #filmsListContainer = null;

  #movieComponent = null;
  #popupComponent = null;
  #contentComments = null;
  #handleDataChange = null;

  movie = null;

  constructor({
    commonFilmsSection,
    filmsListContainer,
    contentComments,
    onDataChange
  }) {
    this.#commonFilmsSection = commonFilmsSection;
    this.#filmsListContainer = filmsListContainer;
    this.#contentComments = contentComments;
    this.#handleDataChange = onDataChange;
  }

  init(movie) {
    this.movie = movie;

    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;


    this.#movieComponent = new FilmCard({
      movie: this.movie,
      onMovieClick: () => {
        this.#appendPopupByCard.call(this);
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#popupComponent = new PopupView({
      contentComments: this.#contentComments,
      movie: this.movie,
      onCloseBtnClick: () => {
        this.#removePopupFromCard.call(this);
        document.removeEventListener('keydown', this.#onEscKeyDown);
      },
      onWatchlistClick: this.#handleWatchlistClick,
      onHistoryClick: this.#handleHistoryClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render(this.#movieComponent, this.#filmsListContainer.element, RenderPosition.AFTERBEGIN);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#filmsListContainer.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#commonFilmsSection.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);

    //render(this.#movieComponent, this.#filmsListContainer.element, RenderPosition.AFTERBEGIN);

  }

  #handleWatchlistClick = () => {
    this.#handleDataChange(this.movie.userDetails.watchlist = !this.movie.userDetails.watchlist);
    console.log('this.movie.id', this.movie.id);
  };

  #handleHistoryClick = () => {
    this.#handleDataChange(this.movie.userDetails.alreadyWatched = !this.movie.userDetails.alreadyWatched);
    console.log('this.movie.id', this.movie.id);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(this.movie.userDetails.favorite = !this.movie.userDetails.favorite);
    console.log('this.movie.id', this.movie.id);
  };

  destroy() {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  }

  #appendPopupByCard() {
    this.#commonFilmsSection.element.appendChild(this.#popupComponent.element);
  }

  #removePopupFromCard() {
    this.#commonFilmsSection.element.removeChild(this.#popupComponent.element);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removePopupFromCard.call(this);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.body.classList.remove('hide-overflow');
    }
  };
}
