export default class CommentsModel {
  #commentsArray = null;

  constructor(commentArr) {
    this.#commentsArray = commentArr;
  }

  get comments() {
    return this.#commentsArray ;
  }
}
