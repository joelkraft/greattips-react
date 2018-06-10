import React from "react";
import { PropTypes } from "prop-types";

class ErrorMessage extends React.Component {
    state = {
        timeoutId: 0
    };
    componentDidMount() {
        const id = window.setTimeout(() => {
            this.props.handleRemove();
        }, 5000);
        this.setState({ timeoutId: id });
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timeoutId);
    }
    render() {
        const { message, handleRemove } = this.props;
        return (
            <div>
                <h3 style={{ color: "red" }}>{message}</h3>
                <button onClick={handleRemove}>Dismiss</button>
            </div>
        );
    }
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired
};

export default ErrorMessage;
