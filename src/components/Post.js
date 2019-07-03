import React, { Component } from "react";
import { getPost, getPostComments } from "../api/API";
import Comment from "./Comment";
import BackButton from "./BackButton";
import UserActions from "./UserActions";
import { votePost } from "../api/API";

class Post extends Component {
  state = {
    details: {},
    comments: []
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.updatePost(postId);
  }

  updatePost(postId) {
    getPost(postId)
      .then(details => {
        this.setState({ details });
      })
      .then(() => {
        getPostComments(postId).then(comments => this.setState({ comments }));
      });
  }

  render() {
    const { details, comments } = this.state;
    const { history } = this.props;
    const { id } = details;
    return (
      <div>
        <h1>
          {details.title}
          <UserActions
            id={id}
            voteFunction={(vote, id) => votePost(vote, id)}
            update={_ => this.updatePost(id)}
          />
        </h1>
        <h3>{details.body}</h3>
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
        <ul>
          {comments &&
            comments.map(c => {
              return (
                <li key={c.id}>
                  <Comment
                    comment={c}
                    updatePost={_ => this.updatePost(c.parentId)}
                  />
                </li>
              );
            })}
        </ul>
        <BackButton history={history} />
      </div>
    );
  }
}

export default Post;
