import {render} from '../render.js';
import ProfileView from '../view/profile-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import CommonFilmsSection from '../view/common-films-section.js';
import FilmsListSection from '../view/films-list-section.js';
import FilmsListContainer from '../view/films-list-container.js';
import SectionTopRated from '../view/section-top-rated.js';
import SectionMostCommented from '../view/section-most-commented.js';
import FilmCard from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';

export default class ContentPresenter {

  profileView = new ProfileView();
  filtersView = new FiltersView();
  sortView = new SortView();
  commonFilmsSection = new CommonFilmsSection();
  filmsListSection = new FilmsListSection();
  filmsListContainer = new FilmsListContainer();
  sectionTopRated = new SectionTopRated();
  sectionMostCommented = new SectionMostCommented();

  contentComments = [];
  contentMovies = [];

  constructor({
    appHeaderContainer,
    appContainer,
    commentsModel,
    moviesModel

  }) {
    this.appHeaderContainer = appHeaderContainer;
    this.appContainer = appContainer;
    this.commentsModel = commentsModel;
    this.moviesModel = moviesModel;
  }

  init = () => {
    this.contentComments = [...this.commentsModel.getComments()];
    this.contentMovies = [...this.moviesModel.getMovies()];

    render(this.profileView, this.appHeaderContainer);
    render(this.filtersView, this.appContainer);
    render(this.sortView, this.appContainer);
    render(this.commonFilmsSection, this.appContainer);
    render(this.filmsListSection, this.commonFilmsSection.getElement());
    render(this.sectionTopRated, this.commonFilmsSection.getElement());
    render(this.sectionMostCommented, this.commonFilmsSection.getElement());

    render(this.filmsListContainer, this.filmsListSection.getElement());

    for (let i = 0; i < this.contentMovies.length; i++) {
      render(new FilmCard({movie: this.contentMovies[i]}), this.filmsListContainer.getElement());
    }
    render(new PopupView(this.contentComments, this.contentMovies[0]), this.filmsListContainer.getElement());

  };
}
