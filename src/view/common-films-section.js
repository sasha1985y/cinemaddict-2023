import {createElement} from '../render.js';

const createCommonFilmsSectionTemplate =
() => (
  '<section class="films"></section>'
);

export default class CommonFilmsSection {
  getTemplate() {
    return createCommonFilmsSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
