import { render, remove, RenderPosition } from '../framework/render.js';
import ProfileView from '../view/profile-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import CommonFilmsSection from '../view/common-films-section.js';
import FilmsListSection from '../view/films-list-section.js';
import FilmsListContainer from '../view/films-list-container.js';
import SectionTopRated from '../view/section-top-rated.js';
import SectionMostCommented from '../view/section-most-commented.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import MoviePresenter from './movie-presenter.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import ListEmpty from '../view/list-empty-view.js';
import { updateItem } from '../utils/common.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class ContentPresenter {

  #appHeaderContainer = null;
  #appContainer = null;
  #appFooterStatisticsContainer = null;
  #commentsModel = null;
  #moviesModel = null;
  #showMoreButtonComponent = null;
  #filtersView = null;

  #sortView = new SortView();
  #commonFilmsSection = new CommonFilmsSection();
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #sectionTopRated = new SectionTopRated();
  #sectionMostCommented = new SectionMostCommented();

  #contentComments = [];
  #contentMovies = [];
  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #moviePresenter = new Map();
  #filter = {
    filterName: 'All',
    currentRenderedMovies: MOVIE_COUNT_PER_STEP
  };

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
    this.#renderFilters(this.#contentMovies);
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
        this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: this.#contentMovies[i] });
      }

      if (this.#contentMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }
    }

  };

  #renderFilters = (contentArray) => {
    this.#filtersView = new FiltersView({
      movies: contentArray,
      onAllMoviesFilterClick: (filter) => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer(filter === 'all' ? this.#filter.filterName = 'All' : this.#filter.filterName = 'All');
        console.log(this.#filter.filterName);
        for (let i = 0; i < Math.min(contentArray.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: contentArray[i] });
        }

        if (contentArray.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowAllMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      },

      onWatchlistFilterClick: (filter) => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer(filter === 'watchlist' ? this.#filter.filterName = 'Watchlist' : this.#filter.filterName = 'All');
        console.log(this.#filter.filterName);
        const watchlistMovies = contentArray.filter((movie) => movie.userDetails.watchlist === true);

        for (let i = 0; i < Math.min(watchlistMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: watchlistMovies[i] });
        }

        if (watchlistMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowWatchlistMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      },

      onHistoryFilterClick: (filter) => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer(filter === 'history' ? this.#filter.filterName = 'History' : this.#filter.filterName = 'All');
        console.log(this.#filter.filterName);
        const historyMovies = contentArray.filter((movie) => movie.userDetails.alreadyWatched === true);

        for (let i = 0; i < Math.min(historyMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: historyMovies[i] });
        }

        if (historyMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowHistoryMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      },

      onFavoritesFilterClick: (filter) => {
        this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
        this.#clearContainer(filter === 'favorites' ? this.#filter.filterName = 'Favorites' : this.#filter.filterName = 'All');
        console.log(this.#filter.filterName);
        const favoriteMovies = contentArray.filter((movie) => movie.userDetails.favorite === true);

        for (let i = 0; i < Math.min(favoriteMovies.length, MOVIE_COUNT_PER_STEP); i++) {
          this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: favoriteMovies[i] });
        }

        if (favoriteMovies.length > MOVIE_COUNT_PER_STEP) {
          this.#showMoreButtonComponent = new ShowMoreButtonView({
            onClick: this.#handleShowFavoriteMoreButtonClick
          });
          render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
        }
      }
    });

    render(this.#filtersView, this.#appContainer, RenderPosition.BEFOREBEGIN);
  };

  #moviesCardsInitialise({movie}) {
    const moviePresenter = new MoviePresenter({
      commonFilmsSection: this.#commonFilmsSection,
      filmsListContainer: this.#filmsListContainer,
      contentComments: this.#contentComments,
      onDataChange: this.#handleMovieChange
    });
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
  }

  #handleMovieChange = (updatedMovie) => {

    this.#clearContainer();
    remove(this.#filtersView, this.#appContainer);
    const updatedContentMovies = updateItem(this.#contentMovies, updatedMovie);
    this.#renderFilters(updatedContentMovies);

    if (this.#filter.filterName === 'All') {
      for (let i = 0; i < Math.min(updatedContentMovies.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: updatedContentMovies[i] });
      }

      if (updatedContentMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }
    } else if (this.#filter.filterName === 'Watchlist') {
      const updatedWatchlistMovies = updatedContentMovies.slice().filter((movie) => movie.userDetails.watchlist === true);
      for (let i = 0; i < Math.min(updatedWatchlistMovies.length, this.#filter.currentRenderedMovies); i++) {
        this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: updatedWatchlistMovies[i]});
      }

      if (updatedWatchlistMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowWatchlistMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }
    } else if (this.#filter.filterName === 'History') {
      const updatedHistoryMovies = updatedContentMovies.slice().filter((movie) => movie.userDetails.alreadyWatched === true);
      for (let i = 0; i < Math.min(updatedHistoryMovies.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: updatedHistoryMovies[i]});
      }

      if (updatedHistoryMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowHistoryMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }

    } else if (this.#filter.filterName === 'Favorites') {
      const updatedFavoritesMovies = updatedContentMovies.slice().filter((movie) => movie.userDetails.favorite === true);
      for (let i = 0; i < Math.min(updatedFavoritesMovies.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#moviesCardsInitialise({ contentComments: this.#contentComments, movie: updatedFavoritesMovies[i]});
      }

      if (updatedFavoritesMovies.length > MOVIE_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView({
          onClick: this.#handleShowFavoriteMoreButtonClick
        });
        render(this.#showMoreButtonComponent, this.#filmsListContainer.element);
      }
    }
    //this.#moviePresenter.get(updatedMovie.id).moviesCardsInitialise(updatedMovie);
    //console.log('updatedMovie', updatedMovie, 'this.#contentMovies', this.#contentMovies, 'this.#moviePresenter', this.#moviePresenter);
    //console.log('this.#contentMovies', this.#contentMovies);
  };

  #clearMovieList() {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  }

  #clearContainer() {
    remove(this.#filmsListContainer);
    render(this.#filmsListContainer, this.#filmsListSection.element);
  }

  #handleShowMoreButtonClick = () => {
    this.#contentMovies
      .slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#moviesCardsInitialise({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= this.#contentMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowAllMoreButtonClick = () => {
    const currentMovies = this.#contentMovies;
    currentMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#moviesCardsInitialise({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowWatchlistMoreButtonClick = () => {
    const currentWatchlistMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.watchlist === true);
    currentWatchlistMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#moviesCardsInitialise({contentComments: this.#contentComments, movie}));

    this.#filter.currentRenderedMovies = this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentWatchlistMovies.length) {
      remove(this.#showMoreButtonComponent);
      this.#filter.currentRenderedMovies = currentWatchlistMovies.length;
    }
    console.log(this.#filter.currentRenderedMovies);
  };

  #handleShowHistoryMoreButtonClick = () => {
    const currentHistoryMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.alreadyWatched === true);
    currentHistoryMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#moviesCardsInitialise({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentHistoryMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleShowFavoriteMoreButtonClick = () => {
    const currentFavoriteMovies = this.#contentMovies.slice().filter((movie) => movie.userDetails.favorite === true);
    currentFavoriteMovies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#moviesCardsInitialise({contentComments: this.#contentComments, movie}));

    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMovieCount >= currentFavoriteMovies.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

}
