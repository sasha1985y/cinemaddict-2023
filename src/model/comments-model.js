import { commentsCollection } from '../mocks/mock-utils';

export default class CommentsModel {
  comments = Array.from(commentsCollection);

  getComments() {
    return this.comments;
  }
}
