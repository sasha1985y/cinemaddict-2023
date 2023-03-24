import AbstractView from '../framework/view/abstract-view.js';

const getProfileStatus = (movies) => {
  let watchStatus = '';
  let photoSize = '';
  const watched = movies.filter((movie) => movie.userDetails.alreadyWatched === true).length;
  if (watched === 0) {
    watchStatus = '';
    photoSize = 'bitmap';
  } else if (watched >= 1 && watched <= 10) {
    watchStatus = 'novice';
    photoSize = 'bitmap';
  } else if (watched >= 11 && watched <= 20) {
    watchStatus = 'fan';
    photoSize = 'bitmap@2x';
  } else {
    watchStatus = 'movie buff';
    photoSize = 'bitmap@3x';
  }
  return {0: watchStatus, 1: photoSize};
};

const createProfileTemplate = (movies) => (
  `<section class="header__profile profile">
      <p class="profile__rating">${getProfileStatus(movies)[0]}</p>
      <img class="profile__avatar" src="images/${getProfileStatus(movies)[1]}.png" alt="Avatar" width="35" height="35">
   </section>`
);

export default class ProfileView extends AbstractView {
  #movies = null;

  constructor({movies}) {
    super();
    this.#movies = movies;
  }

  get template() {
    return createProfileTemplate(this.#movies);
  }
}
