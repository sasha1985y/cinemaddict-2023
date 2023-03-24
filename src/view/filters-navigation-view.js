import AbstractView from '../framework/view/abstract-view.js';

const createFiltersTemplate =
() => (
  '<nav class="main-navigation"></nav>'
);

export default class FiltersContainerView extends AbstractView {

  get template() {
    return createFiltersTemplate();
  }
}
