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

  #appHeaderContainer = null;
  #appContainer = null;
  #commentsModel = null;
  #moviesModel = null;

  #profileView = new ProfileView();
  #filtersView = new FiltersView();
  #sortView = new SortView();
  #commonFilmsSection = new CommonFilmsSection();
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #sectionTopRated = new SectionTopRated();
  #sectionMostCommented = new SectionMostCommented();

  #contentComments = [];
  #contentMovies = [];

  constructor({
    appHeaderContainer,
    appContainer,
    commentsModel,
    moviesModel

  }) {
    this.#appHeaderContainer = appHeaderContainer;
    this.#appContainer = appContainer;
    this.#commentsModel = commentsModel;
    this.#moviesModel = moviesModel;
  }

  init = () => {
    this.#contentComments = [...this.#commentsModel.comments];
    this.#contentMovies = [...this.#moviesModel.movies];

    render(this.#profileView, this.#appHeaderContainer);
    render(this.#filtersView, this.#appContainer);
    render(this.#sortView, this.#appContainer);
    render(this.#commonFilmsSection, this.#appContainer);
    render(this.#filmsListSection, this.#commonFilmsSection.element);
    render(this.#sectionTopRated, this.#commonFilmsSection.element);
    render(this.#sectionMostCommented, this.#commonFilmsSection.element);

    render(this.#filmsListContainer, this.#filmsListSection.element);

    for (let i = 0; i < this.#contentMovies.length; i++) {
      this.#renderMovie({contentComments:this.#contentComments, movie: this.#contentMovies[i]});
    }

  };

  #renderMovie ({contentComments, movie}) {
    const movieComponent = new FilmCard({movie});
    const popupComponent = new PopupView({contentComments, movie});

    const appendPopupByCard = () => {
      this.#filmsListContainer.element.appendChild(popupComponent.element);
    };

    const removePopupFromCard = () => {
      this.#filmsListContainer.element.removeChild(popupComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopupFromCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    movieComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      appendPopupByCard();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      removePopupFromCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(movieComponent, this.#filmsListContainer.element);

  }

}
