import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PostsPerCategory from "./components/PostsPerCategory";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import { getCategories } from "./api/API";

class App extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    getCategories().then(categories => this.setState({ categories }));
  }

  render() {
    const { categories } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Link to={"/"}>Home</Link>
          <div className="Menu">
            <ul>
              {categories &&
                categories.map(cat => (
                  <Link to={`/${cat.path}`} key={cat.path}>
                    <li>{cat.name}</li>
                  </Link>
                ))}
            </ul>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:categoria/:postId" component={Post} />
            <Route
              path="/:category"
              render={props => (
                <PostsPerCategory {...props} categories={categories} />
              )}
            />
            <Route path="/newPost" component={NewPost} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
