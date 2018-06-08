import React from "react";
import { PropTypes } from "prop-types";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { toggleUserMenu } from '../actions/profile'

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
    toggleUserMenu: (data) =>
            dispatch(toggleUserMenu())
})
class ActionBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            <div>
            <ul>
                <li><Link to="/categories">Browse</Link></li>
                <li><Link to="/tips/new">New Tip</Link></li>
                <li><button onClick={this.props.toggleUserMenu}>User</button></li>
            </ul>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);
