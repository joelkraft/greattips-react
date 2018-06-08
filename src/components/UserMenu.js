import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { clearUser } from '../actions/profile'

const mapStateToProps = state => ({
    isVisible: state.profile.userMenuVisible
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(clearUser())
});
class UserMenu extends React.Component {
    state = {
        username: "",
        password: ""
    };

    submit = () => this.props.login(this.state);

    setVal = (label, value) => {
        this.setState({ [label]: value });
    };
    saveUserData() {
        // this.setState({ isEditing: false });
        // this.props.handleSaveUserData(this.state.localUserData)
    }
    cancelEditUserData() {
        // this.setState({ isEditing: false, localUserData: this.props.userData });
    }
    render() {
        if (this.props.isVisible) {
            return (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.submit();
                        }}
                    >
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={this.state.username}
                            onChange={e =>
                                this.setVal("username", e.target.value)
                            }
                        />
                        <label htmlFor="password">Username</label>
                        <input
                            type="password"
                            id="password"
                            value={this.state.password}
                            onChange={e =>
                                this.setVal("password", e.target.value)
                            }
                        />
                        <button type="submit">Log in</button>
                    </form>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
            );
        }
        return null;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
