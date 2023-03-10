import {createElement} from '../render.js';

const createCommonFilmsSectionTemplate =
() => (
  '<section class="films"></section>'
);

export default class CommonFilmsSection {

  #element = null;

  get template() {
    return createCommonFilmsSectionTemplate();
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
