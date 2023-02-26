import dayjs from 'dayjs';

const GLOBAL_INTEGER = 5;
const MIN_MONTHS = 1;
const SOME_DAYS = 15;
const MAX_HOURS = 24;
const MAX_MINUTES = 60;
const MIN_YEARS = 30;
const MIN_DURATION = 45;
const MAX_DURATION = 120;


const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const ACTORS = ['Morgan Freeman', 'John Travolta', 'Mickey Rurk', 'Silvestr Stallone', 'Rey Liotta', 'Kianu Reavs', 'Jaison Stetham'];
const ALTERNATIVE_TITLES = ['For ur mom', 'Enjoy fool', 'Horror movie for you', 'your favorite movie', 'Nice movie'];
const AUTORS = ['Vasya', 'Petya', 'Sergey', 'Pavel', 'Roman', 'Sasha', 'Masha', 'Lera', 'Vika', 'Klava', 'Dasha'];
const DIRECTORS = ['John Berk', 'Frank Black', 'Shon Sennon', 'Fred Bozes'];
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const POSTERS = ['./images/posters/made-for-each-other.png', './images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg', './images/posters/santa-claus-conquers-the-martians.jpg', './images/posters/the-dance-of-life.jpg', './images/posters/the-great-flamarion.jpg', './images/posters/the-man-with-the-golden-arm.jpg'];
const TITLES = ['Robocop', 'Terminator', 'Ninja', 'Jaws', 'Thuesday 13th', 'Highlander', 'Harry Potter'];
const WRITERS = ['Takeshi Kitano', 'Mel Gibson', 'Arnold Van-Damm', 'Jean Clode Shwazenegger', 'Jorge Cameron', 'John Woo', 'Quentin Tarantino'];
const COUNTRIES = ['Finland', 'France', 'Italy', 'Germany', 'Japan', 'USA', 'Dubay'];
const GENRES = ['Comedy', 'Tragedy', 'Detective', 'Action movie', 'Block buster', 'Horror', 'Nuar', 'Documental'];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = () => (Math.random() * 10).toFixed(1);

const createRandomArr = (arr) => {
  const localRandomCollection = new Set();
  for (let i = 0; i < getRandomInteger(1, GLOBAL_INTEGER); i++) {
    const element = arr[getRandomInteger(0, arr.length - 1)];
    localRandomCollection.add(element);
  }
  return Array.from(localRandomCollection);
};

const generateCommentDate = () => {
  const commentTime = dayjs().subtract(getRandomInteger(0, SOME_DAYS), 'day').subtract(getRandomInteger(0, MAX_HOURS), 'hour').subtract(getRandomInteger(0, MAX_MINUTES), 'minute').format();
  return commentTime;
};

const generateReleaseDate = () => {
  const releaseTime = dayjs().subtract(getRandomInteger(MIN_YEARS, 0), 'year').subtract(getRandomInteger(MIN_MONTHS, 0), 'month').subtract(getRandomInteger(0, SOME_DAYS), 'day').format('DD MMMM YYYY');
  return releaseTime;
};

const createRandomLengthCommentArr = () => {
  const localCommentArray = [];
  for (let i = 0; i < getRandomInteger(0, GLOBAL_INTEGER); i++) {
    const localObj = {
      id: 1,
      author: AUTORS[getRandomInteger(0, AUTORS.length - 1)],
      comment: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
      date: generateCommentDate(),
      emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)]
    };
    localCommentArray.push(localObj);
    localObj.id = i + 1;
  }
  return localCommentArray;
};

const createComment = () => {
  const localCommentCollection = new Map();
  for (let i = 0; i < GLOBAL_INTEGER; i++) {
    localCommentCollection.set(i + 1, createRandomLengthCommentArr());
  }
  return localCommentCollection;
};

const commentsCollection = createComment();


const createMovie = () => {
  const localMovieArr = [];
  for (let i = 0; i < GLOBAL_INTEGER; i++) {
    const localMovie = {
      id: 1,
      comments: Array.from(commentsCollection.get(i + 1)).map((comment) => comment.id),
      filmInfo: {
        title: TITLES[getRandomInteger(0, TITLES.length - 1)],
        alternativeTitle: ALTERNATIVE_TITLES[getRandomInteger(0, ALTERNATIVE_TITLES.length - 1)],
        totalRating: getRandomFloat(),
        poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
        ageRating: 0,
        director: DIRECTORS[getRandomInteger(0, DIRECTORS.length - 1)],
        writers: createRandomArr(WRITERS),
        actors: createRandomArr(ACTORS),
        release: {
          date: generateReleaseDate(),
          releaseCountry: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)]
        },
        duration: getRandomInteger(MIN_DURATION, MAX_DURATION),
        genre: createRandomArr(GENRES),
        description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]
      },
      userDetails: {
        watchlist: Boolean(getRandomInteger(true, false)),
        alreadyWatched: Boolean(getRandomInteger(true, false)),
        watchingDate: generateCommentDate(),
        favorite: Boolean(getRandomInteger(true, false))
      }
    };
    localMovieArr.push(localMovie);
    localMovie.id = i + 1;
  }
  return localMovieArr;
};

const movieArr = createMovie();

export {GLOBAL_INTEGER, movieArr, commentsCollection};
