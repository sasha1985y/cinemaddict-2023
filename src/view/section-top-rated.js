import {createElement} from '../render.js';

const createSectionTopRatedTemplate =
() => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
  </section>`
);

export default class SectionTopRated {
  getTemplate() {
    return createSectionTopRatedTemplate();
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
