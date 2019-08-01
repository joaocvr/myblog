import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Categories = ({ categories }) => {
  console.log("Categories", "categories", categories);

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

export default connect()(Categories);
