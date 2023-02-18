import {createElement} from '../render.js';

const createSectionMostCommentedTemplate =
() => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class SectionMostCommented {
  getTemplate() {
    return createSectionMostCommentedTemplate();
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
