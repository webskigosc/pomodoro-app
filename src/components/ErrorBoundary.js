import React from 'react';
import ErrorMessage from './ErrorMessage';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error message: ', error, info);
  }

  render() {
    const { message, children } = this.props;

    return (
      <ErrorMessage
        hasError={this.state.hasError}
        message={message}
        children={children}
      />
    );
  }
}

ErrorBoundary.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
