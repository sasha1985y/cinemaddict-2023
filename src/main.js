import ContentPresenter from './presenter/content-presenter.js';
import CommentsModel from './model/comments-model.js';
import MoviesModel from './model/movies-model.js';
import { movieArr } from './mocks/mock-utils.js';
import { commentArr } from './mocks/mock-utils.js';

const appHeaderElement = document.querySelector('.header');
const appMainElement = document.querySelector('.main');
const appFooterStatisticsElement = document.querySelector('.footer__statistics');

const commentsModel = new CommentsModel(commentArr);
const moviesModel = new MoviesModel(movieArr);

const contentPresenter = new ContentPresenter({
  appHeaderContainer: appHeaderElement,
  appContainer: appMainElement,
  appFooterStatisticsContainer: appFooterStatisticsElement,
  commentsModel,
  moviesModel
});

contentPresenter.init();
