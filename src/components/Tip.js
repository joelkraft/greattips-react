import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from "./ActionBar";
import Ratings from "./Ratings";

import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { getTip } from "../actions/tips";
const mapStateToProps = state => ({
    tips: state.tips.tips
});
const mapDispatchToProps = dispatch => ({
    handleRequestTip: id => dispatch(getTip(id))
});

const defaultState = {
    text: '',
    category: ''
}

class Tip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...defaultState}
    }
    componentDidMount () {
        // check if tip is present in memory, otherwise request it from api
        const id = this.props.match.params.id
        const inMemoryTip = this.props.tips.find(tip=>tip.id.toString() === id)
        if (inMemoryTip) {
            this.setState({ text: inMemoryTip.text, category: inMemoryTip.category })
        } else {
            this.props.handleRequestTip(id)
                .then(({tip})=> this.setState({ text: tip.text, category: tip.category }))
        }
    }
    render() {
        return (
            <div>
                <p><Link to={`/categories/${this.state.category}`}>{'< Back'}</Link></p>
                <h1>Tip</h1>
                <p>{this.state.text}</p>
                <h2>Category</h2>
                <p>{this.state.category}</p>
                <Ratings tipId={this.props.match.params.id} />
                <ActionBar />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tip);
