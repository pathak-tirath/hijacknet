import { makeAutoObservable } from 'mobx';

interface Comment {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  timestamp: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

class CommentsStore {
  comments: Comment[] = [];
  activeCommentId: string | null = null;
  activeReplyId: string | null = null;
  newCommentText: string = '';
  replyText: { [key: string]: string } = {};

  constructor() {
    makeAutoObservable(this);
  }

  setNewCommentText(text: string) {
    this.newCommentText = text;
  }

  setReplyText(commentId: string, text: string) {
    this.replyText[commentId] = text;
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
    this.newCommentText = ''; // reset comment box
  }

  addReply(commentId: string, reply: Reply) {
    const comment = this.comments.find((comment) => comment.id === commentId);
    if (comment) {
      comment.replies.push(reply);
      this.replyText[commentId] = ''; // reset reply box
    }
  }

  setActiveComment(commentId: string | null) {
    this.activeCommentId = commentId;
  }

  setActiveReply(commentId: string | null) {
    this.activeReplyId = commentId;
  }

  get totalComments() {
    return this.comments.length;
  }
}

const commentsStore = new CommentsStore();
export default commentsStore;
