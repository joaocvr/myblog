import React, { Component } from "react";
import Modal from "react-awesome-modal";
import uuid from "uuid";
import { connect } from "react-redux";
import { addingNewComment } from "./actions";

class NewComment extends Component {
  state = {
    visible: true,
    body: "",
    author: ""
  };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    const { close } = this.props;
    close();
  }

  submitNewComment(e) {
    e.preventDefault();

    const { postId, addingNewComment } = this.props;
    const { body, author } = this.state;
    if (body && author) {
      addingNewComment({
        id: uuid.v4(),
        timestamp: Date.now(),
        body,
        author,
        deleted: false,
        parentId: postId,
        voteScore: 0
      }).then(() => this.closeModal());
    } else {
      alert("You must fullfill all the fields.");
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal
        visible={visible}
        width="400"
        height="300"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}
      >
        <div>
          <h1>Insert new comment</h1>
          <form onSubmit={e => this.submitNewComment(e)}>
            Comment:{" "}
            <input
              placeholder="Comment"
              onChange={event => this.setState({ body: event.target.value })}
            />
            Author:{" "}
            <input
              placeholder="Author"
              onChange={event => this.setState({ author: event.target.value })}
            />
            <button>Save</button>
          </form>
          <button onClick={() => this.closeModal()}>Close</button>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addingNewComment: async newComment => {
      dispatch(addingNewComment(newComment));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewComment);
