import AbstractView from '../framework/view/abstract-view.js';

const createListEmptyTemplate =
() => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class ListEmpty extends AbstractView {

  get template() {
    return createListEmptyTemplate();
  }
}
