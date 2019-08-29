import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sortingPosts } from "./actions";

const PostsList = ({ posts, sortingPosts }) => {
  return (
    <div>
      <button onClick={() => sortingPosts("timestamp")}>Order per date</button>
      <button onClick={() => sortingPosts("voteScore")}>
        Order per vote score
      </button>
      <ol>
        {posts &&
          posts.map(p => {
            return (
              <li key={p.id}>
                <Link to={`/${p.category}/${p.id}`}>
                  <strong>
                    {p.title} (
                    {`${p.voteScore} score votes, ${new Date(
                      p.timestamp
                    ).toLocaleDateString("pt-BR")}`}
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
};

export default connect(
  null,
  { sortingPosts }
)(PostsList);
