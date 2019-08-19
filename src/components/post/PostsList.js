import React, { Component } from "react";
import { Link } from "react-router-dom";

class PostsList extends Component {
  state = {
    localPosts: []
  };

  sortPosts(oldPosts, attribute) {
    const sortedPosts = oldPosts.sort((postA, postB) =>
      postA[attribute] > postB[attribute] ? 0 : 1
    );
    this.setState({ localPosts: sortedPosts });
  }

  componentDidMount() {
    const { posts } = this.props;
    this.setState({ localPosts: posts });
  }

  componentDidUpdate(prevProps) {
    if (this.props.posts !== prevProps.posts) {
      this.setState({ localPosts: this.props.posts });
    }
  }

  render() {
    const { localPosts } = this.state;
    return (
      <div>
        <button onClick={() => this.sortPosts(localPosts, "timestamp")}>
          Order per date
        </button>
        <button onClick={() => this.sortPosts(localPosts, "voteScore")}>
          Order per vote score
        </button>
        <ol>
          {localPosts &&
            localPosts.map(p => {
              return (
                <li key={p.id}>
                  <Link to={`/${p.category}/${p.id}`}>
                    <strong>
                      {p.title} (
                      {`${p.commentCount} comments, ${p.voteScore} score votes`}
                      )
                    </strong>
                  </Link>
                  <br />
                  Category: {p.category}
                  <br />
                  Author: {p.author} <br />
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
}

export default PostsList;
