import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from "./ActionBar";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

const mapStateToProps = state => ({
    tips: state.tips.tips
});

const TipPreview = props => {
    const { tips, match } = props;
    return (
        <div>
            <p>
                <Link to="/categories">{"< Back"}</Link>
            </p>
            <h1>Tip Preview</h1>
            <p>{match.params.category}</p>
            <ul>
                {tips
                    .filter(tip => tip.category === match.params.category)
                    .map(({ text, id }) => (
                        <Link to={`/tips/${id}`} key={id}>
                            <li>{text}</li>
                        </Link>
                    ))}
            </ul>
            <ActionBar />
        </div>
    );
};

TipPreview.propTypes = {
    tips: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TipPreview);
