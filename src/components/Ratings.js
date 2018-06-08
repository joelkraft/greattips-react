import React from "react";
// import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { saveNewRating } from "../actions/ratings";

import './Ratings.css'
const mapStateToProps = state => ({
    ratings: state.ratings.data
});
const mapDispatchToProps = dispatch => ({
    handleSaveNewRating: data => dispatch(saveNewRating(data))
});
const filterNonRelaventRatings = tipId => rating => {
    return rating.tipId.toString() === tipId.toString();
};

const defaultState = {
    showRatingForm: false,
    ratingForm: {
        value: 0.5,
        text: ""
    }
}
class Ratings extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }
    setToEditing() {
        this.setState({ isEditing: true });
    }
    setVal(label, value) {
        this.setState({
            // localUserData: this.state.localUserData.map(
            //     datum =>
            //         datum.label === label ? { ...datum, value } : { ...datum }
            // )
        });
    }
    saveUserData() {
        // this.setState({ isEditing: false });
        // this.props.handleSaveUserData(this.state.localUserData)
    }
    cancelEditUserData() {
        // this.setState({ isEditing: false, localUserData: this.props.userData });
    }

    render() {
        return (
            <div id="ratings">
                <h2>Ratings</h2>
                <button onClick={() => this.setState({ showRatingForm: true })}>
                    Rate this tip
                </button>
                {this.state.showRatingForm && (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.props.handleSaveNewRating({
                                ...this.state.ratingForm,
                                tipId: this.props.tipId,
                                id: this.props.ratings.length
                            })
                            this.setState(defaultState)
                        }}
                    >
                        <label>Stars</label>
                        <p>{this.state.ratingForm.value}</p>
                        <input
                            type="range"
                            min="0.5"
                            max="5"
                            step="0.5"
                            value={this.state.ratingForm.value}
                            onChange={e =>
                                this.setState({
                                    ratingForm: {
                                        ...this.state.ratingForm,
                                        value: e.target.value
                                    }
                                })
                            }
                        />
                        <label>Comments</label>
                        <textarea
                            value={this.state.ratingForm.text}
                            onChange={e =>
                                this.setState({
                                    ratingForm: {
                                        ...this.state.ratingForm,
                                        text: e.target.value
                                    }
                                })
                            }
                            placeholder="Please leave comments here"
                        />
                        <button type="Submit">Submit rating</button>
                        <button type="Cancel" onClick={()=>this.setState(defaultState)}>Cancel</button>
                    </form>
                )}
                {this.props.ratings.filter(
                    filterNonRelaventRatings(this.props.tipId)
                ).length ? (
                    <ul>
                        {this.props.ratings
                            .filter(filterNonRelaventRatings(this.props.tipId))
                            .map(rating => (
                                <li>
                                    <b>Number of Stars:</b> {rating.value},{" "}
                                    <b>Comments:</b> {rating.text}
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p>There are no ratings yet.</p>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
