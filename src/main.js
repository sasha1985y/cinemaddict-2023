import ContentPresenter from './presenter/content-presenter.js';

const appHeaderElement = document.querySelector('.header');
const appMainElement = document.querySelector('.main');

const contentPresenter = new ContentPresenter({
  appHeaderContainer: appHeaderElement,
  appContainer: appMainElement
});

contentPresenter.init();
