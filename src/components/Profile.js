import React from "react";
import { PropTypes } from "prop-types";

import ActionBar from './ActionBar'

import { connect } from "react-redux";

import { saveUserData } from '../actions/profile'
const mapStateToProps = state => ({
    userData: state.profile.userData
});
const mapDispatchToProps = dispatch => ({
    handleSaveUserData: (data) =>
            dispatch(saveUserData(data))
})
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            localUserData: this.props.userData
        };
    }
    setToEditing() {
        this.setState({ isEditing: true });
    }
    setVal(label, value) {
        this.setState({
            localUserData: this.state.localUserData.map(
                datum =>
                    datum.label === label ? { ...datum, value } : { ...datum }
            )
        });
    }
    saveUserData() {
        this.setState({ isEditing: false });
        this.props.handleSaveUserData(this.state.localUserData)
    }
    cancelEditUserData() {
        this.setState({ isEditing: false, localUserData: this.props.userData });
    }
    render() {
        return (
            <div>
                {this.state.isEditing ? (
                    <div>
                        <button onClick={this.saveUserData.bind(this)}>
                            Save
                        </button>
                        <button onClick={this.cancelEditUserData.bind(this)}>
                            Cancel
                        </button>
                        {this.state.localUserData.map(line => (
                            <div key={line.label}>
                                <p>{line.label}</p>
                                <input
                                    type="text"
                                    value={line.value}
                                    onChange={e =>
                                        this.setVal(line.label, e.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <button onClick={this.setToEditing.bind(this)}>
                            Edit
                        </button>
                        <table>
                            <tbody>
                                {this.state.localUserData.map(line => {
                                    return (
                                        <tr key={line.label}>
                                            <td>{line.label}</td>
                                            <td>{line.value}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                <ActionBar />
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
