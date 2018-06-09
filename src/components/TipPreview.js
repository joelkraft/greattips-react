import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from "./ActionBar";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTip } from "../actions/tips";

const mapStateToProps = state => ({
    tips: state.tips.tips
});

const extractCategories = tips => {
    const categories = tips.reduce(
        (categories, tip) => categories.add(tip.category),
        new Set()
    );
    return Array.from(categories);
};

class TipPreview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p><Link to="/categories">{'< Back'}</Link></p>
                <h1>Tip Preview</h1>
                <p>{this.props.match.params.category}</p>
                <ul>
                    {this.props.tips
                        .filter(
                            (tip) =>
                                tip.category ===
                                this.props.match.params.category
                        )
                        .map(({text, id}) => <Link to={`/tips/${id}`} key={id}><li>{text}</li></Link>)}
                </ul>
                <ActionBar />
            </div>
        );
    }
}

export default connect(mapStateToProps)(TipPreview);
