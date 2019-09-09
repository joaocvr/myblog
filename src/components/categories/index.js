import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingCategories } from "./actions";

class Categories extends Component {
  componentDidMount() {
    const { fetchingCategories } = this.props;
    fetchingCategories();
  }

  render() {
    const { categories } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(
  mapStateToProps,
  { fetchingCategories }
)(Categories);
