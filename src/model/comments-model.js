export default class CommentsModel {
  #commentsArray = null;

  constructor(commentsCollection) {
    this.#commentsArray = Array.from(commentsCollection);
  }

  get comments() {
    return this.#commentsArray ;
  }
}
