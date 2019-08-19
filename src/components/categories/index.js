import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Categories = ({ categories }) => {
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
};

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(Categories);
