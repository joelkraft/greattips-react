import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from "./ActionBar";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTip } from "../actions/tips";

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

export default connect(mapStateToProps)(Categories);
