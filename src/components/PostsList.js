import React from "react";
import { Link } from "react-router-dom";

const PostsList = ({ posts }) => {
  return (
    <div>
      <ol>
        {posts &&
          posts.map(p => {
            return (
              <li key={p.id}>
                <Link to={`/${p.category}/${p.id}`}>
                  <strong>
                    {p.title} (
                    {`${p.commentCount} comments, ${p.voteScore} score votes`})
                  </strong>
                </Link>
                <br />
                Category: {p.category}
                <br />
                Author: {p.author} <br />
                {p.body} <br />
                <br />
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default PostsList;
