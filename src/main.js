import ContentPresenter from './presenter/content-presenter.js';
import CommentsModel from './model/comments-model.js';
import MoviesModel from './model/movies-model.js';

const appHeaderElement = document.querySelector('.header');
const appMainElement = document.querySelector('.main');

const commentsModel = new CommentsModel();
const moviesModel = new MoviesModel();

const contentPresenter = new ContentPresenter({
  appHeaderContainer: appHeaderElement,
  appContainer: appMainElement,
  commentsModel,
  moviesModel
});

contentPresenter.init();
