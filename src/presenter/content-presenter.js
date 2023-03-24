import { render, RenderPosition, remove } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import FiltersContainerView from '../view/filters-navigation-view.js';
import AllMoviesFilterView from '../view/all-movies-filter-view.js';
import WatchlistFilterView from '../view/watchlist-filter-view.js';
import HistoryFilterView from '../view/history-filter-view.js';
import FavoritesFilterView from '../view/favorites-filter-view.js';
import SortView from '../view/sort-view.js';
import CommonFilmsSection from '../view/common-films-section.js';
import FilmsListSection from '../view/films-list-section.js';
import FilmsListContainer from '../view/films-list-container.js';
import SectionTopRated from '../view/section-top-rated.js';
import SectionMostCommented from '../view/section-most-commented.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmCard from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ListEmpty from '../view/list-empty-view.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class ContentPresenter {

  #appHeaderContainer = null;
  #appContainer = null;
  #appFooterStatisticsContainer = null;
  #commentsModel = null;
  #moviesModel = null;
  #showMoreButtonComponent = null;

  #filtersContainerView = new FiltersContainerView();
  #sortView = new SortView();
  #commonFilmsSection = new CommonFilmsSection();
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #sectionTopRated = new SectionTopRated();
  #sectionMostCommented = new SectionMostCommented();

  #contentComments = [];
  #contentMovies = [];
  #renderedMovieCount = MOVIE_COUNT_PER_STEP;

  constructor({
    appHeaderContainer,
    appContainer,
    appFooterStatisticsContainer,
    commentsModel,
    moviesModel

  }) {
    this.#appHeaderContainer = appHeaderContainer;
    this.#appContainer = appContainer;
    this.#appFooterStatisticsContainer = appFooterStatisticsContainer;
    this.#commentsModel = commentsModel;
    this.#moviesModel = moviesModel;
  }

  init = () => {
    this.#contentComments = [...this.#commentsModel.comments];
    this.#contentMovies = [...this.#moviesModel.movies];

    const profileView = new ProfileView({movies: this.#contentMovies});
    const footerStatisticsView = new FooterStatisticsView({movies: this.#contentMovies});

    render(profileView, this.#appHeaderContainer);
    render(this.#filtersContainerView, this.#appContainer);
    this.#renderFilters({movies: this.#contentMovies});
    render(this.#sortView, this.#appContainer);
    render(this.#commonFilmsSection, this.#appContainer);
    render(this.#filmsListSection, this.#commonFilmsSection.element);
    render(this.#sectionTopRated, this.#commonFilmsSection.element);
    render(this.#sectionMostCommented, this.#commonFilmsSection.element);
    render(footerStatisticsView, this.#appFooterStatisticsContainer);
    render(this.#filmsListContainer, this.#filmsListSection.element);

    if (this.#contentMovies.length === 0) {
      render(new ListEmpty(), this.#filmsListSection.element);
    } else {
      for (let i = 0; i < Math.min(this.#contentMovies.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#renderMovie({ contentComments: this.#contentComments, movie: this.#contentMovies[i] });
      }

      if (this.#contentMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }
    }

  };

  #renderMovie ({ contentComments, movie }) {

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopupFromCard.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
        document.body.classList.remove('hide-overflow');
      }
    };

    const movieComponent = new FilmCard({
      movie,
      onMovieClick: () => {
        appendPopupByCard.call(this);
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    const popupComponent = new PopupView({
      contentComments,
      movie,
      onCloseBtnClick: () => {
        removePopupFromCard.call(this);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    });

    function appendPopupByCard() {
      this.#filmsListContainer.element.appendChild(popupComponent.element);
    }

    function removePopupFromCard() {
      this.#filmsListContainer.element.removeChild(popupComponent.element);
    }

    render(movieComponent, this.#filmsListContainer.element, RenderPosition.AFTERBEGIN);
  }

  #clearContainer() {
    remove(this.#filmsListContainer);
    render(this.#filmsListContainer, this.#filmsListSection.element);
  }

  #handleShowMoreButtonClick = () => {
    this.#contentMovies
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= this.#contentMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowAllMoreButtonClick = () => {
    const currentMovies = this.#contentMovies.slice();
    currentMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowWatchlistMoreButtonClick = () => {
    const currentWatchlistMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.watchlist === true);
    currentWatchlistMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentWatchlistMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowHistoryMoreButtonClick = () => {
    const currentHistoryMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.alreadyWatched === true);
    currentHistoryMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentHistoryMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowFavoriteMoreButtonClick = () => {
    const currentFavoriteMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.favorite === true);
    currentFavoriteMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderMovie({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentFavoriteMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };


  #renderFilters({movies}) {

    const allMoviesFilterView = new AllMoviesFilterView({
      onAllMoviesFilterClick: () => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer();
        const allMovies = movies.slice();
        for (let i = 0; i < Math.min(allMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#renderMovie({ contentComments: this.#contentComments, movie: allMovies[i] });
        }

        if (allMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowAllMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      }
    });

    const watchlistFilterView = new WatchlistFilterView({
      movies,
      onWatchlistFilterClick: () => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer();
        const watchlistMovies = movies.slice().filter((movie) => movie.userDetails.watchlist === true);


        for (let i = 0; i < Math.min(watchlistMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#renderMovie({ contentComments: this.#contentComments, movie: watchlistMovies[i] });
        }

        if (watchlistMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowWatchlistMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }

      }
    });

    const historyFilterView = new HistoryFilterView({
      movies,
      onHistoryFilterClick: () => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer();
        const historyMovies = movies.slice().filter((movie) => movie.userDetails.alreadyWatched === true);

        for (let i = 0; i < Math.min(historyMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#renderMovie({ contentComments: this.#contentComments, movie: historyMovies[i] });
        }

        if (historyMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowHistoryMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      }
    });

    const favoritesFilterView = new FavoritesFilterView({
      movies,
      onFavoritesFilterClick: () => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer();
        const favoriteMovies = movies.slice().filter((movie) => movie.userDetails.favorite === true);

        for (let i = 0; i < Math.min(favoriteMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#renderMovie({ contentComments: this.#contentComments, movie: favoriteMovies[i] });
        }

        if (favoriteMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowFavoriteMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      }
    });

    render(allMoviesFilterView, this.#filtersContainerView.element);
    render(watchlistFilterView, this.#filtersContainerView.element);
    render(historyFilterView, this.#filtersContainerView.element);
    render(favoritesFilterView, this.#filtersContainerView.element);
  }
}
