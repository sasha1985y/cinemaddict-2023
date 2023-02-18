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
import { GLOBAL_INTEGER } from '../mocks/mock-utils.js';

export default class ContentPresenter {
  #appHeaderContainer = null;
  #appContainer = null;

  #profileView = new ProfileView();
  #filtersView = new FiltersView();
  #sortView = new SortView();
  #commonFilmsSection = new CommonFilmsSection();
  #filmsListSection = new FilmsListSection();
  #filmsListContainer = new FilmsListContainer();
  #sectionTopRated = new SectionTopRated();
  #sectionMostCommented = new SectionMostCommented();

  constructor({
    appHeaderContainer,
    appContainer
  }) {
    this.#appHeaderContainer = appHeaderContainer;
    this.#appContainer = appContainer;
  }

  init = () => {
    render(this.#profileView, this.#appHeaderContainer);
    render(this.#filtersView, this.#appContainer);
    render(this.#sortView, this.#appContainer);
    render(this.#commonFilmsSection, this.#appContainer);
    render(this.#filmsListSection, this.#commonFilmsSection.getElement());
    render(this.#sectionTopRated, this.#commonFilmsSection.getElement());
    render(this.#sectionMostCommented, this.#commonFilmsSection.getElement());

    render(this.#filmsListContainer, this.#filmsListSection.getElement());

    for (let i = 0; i < GLOBAL_INTEGER; i++) {
      render(new FilmCard(), this.#filmsListContainer.getElement());
    }
  };
}
