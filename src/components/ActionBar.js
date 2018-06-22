// Libs
import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

// Components
import UserMenu from "./UserMenu";
import { Link } from 'react-router-dom'

// Actions
import { toggleUserMenu } from '../actions/profile'

import './ActionBar.css'

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
            <div className="ActionBar">
            <ul>
                <li><button title="Browse"><Link to="/categories"><i className="fas fa-hand-point-up"></i></Link></button></li>
                <li><button title="New Tip"><Link to="/tips/new"><i className="fas fa-lightbulb"></i></Link></button></li>
                <li><button title="User" onClick={this.props.toggleUserMenu}><i className="fas fa-user"></i></button></li>
            </ul>
            <UserMenu />
            </div>
        );
    }
}

ActionBar.propTypes = {
    toggleUserMenu: PropTypes.func.isRequired
}
export default connect(mapStateToProps,mapDispatchToProps)(ActionBar);
