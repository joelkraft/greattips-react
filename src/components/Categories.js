import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from "./ActionBar";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

const mapStateToProps = state => ({
    tips: state.tips.tips
});

const defaultState = {
    tips: []
};

const extractCategories = tips => {
    const categories = tips.reduce(
        (categories, tip) => categories.add(tip.category),
        new Set()
    );
    return Array.from(categories);
};

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...defaultState };
    }

    render() {
        return (
            <div>
                <h1>Categories</h1>
                {extractCategories(this.props.tips).map(category => (
                    <Link to={`/categories/${category}`} key={category}>
                        <p>{category}</p>
                    </Link>
                ))}
                <ActionBar />
            </div>
        );
    }
}

Categories.propTypes = {
    tips: PropTypes.array
}

export default connect(mapStateToProps)(Categories);
