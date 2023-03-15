import AbstractView from '../framework/view/abstract-view.js';

const createCommonFilmsSectionTemplate =
() => (
  '<section class="films"></section>'
);

export default class CommonFilmsSection extends AbstractView {

  get template() {
    return createCommonFilmsSectionTemplate();
  }
}
