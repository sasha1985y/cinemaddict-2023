import ContentPresenter from './presenter/content-presenter.js';
import CommentsModel from './model/comments-model.js';
import MoviesModel from './model/movies-model.js';
import { movieArr } from './mocks/mock-utils.js';
import { commentsCollection } from './mocks/mock-utils.js';

const appHeaderElement = document.querySelector('.header');
const appMainElement = document.querySelector('.main');

const commentsModel = new CommentsModel(commentsCollection);
const moviesModel = new MoviesModel(movieArr);

const contentPresenter = new ContentPresenter({
  appHeaderContainer: appHeaderElement,
  appContainer: appMainElement,
  commentsModel,
  moviesModel
});

contentPresenter.init();
