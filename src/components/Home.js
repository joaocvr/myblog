import React from "react";
import "../App.css";
import Post from "./Post";

const Home = () => {
  return (
    <div>
      <h1>Home TEST</h1>
      <ol>
        <li>
          <Post content="Example home post" />
        </li>
      </ol>
    </div>
  );
};

export default Home;
