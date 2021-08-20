import React from 'react';
import ErrorMessage from './ErrorMessage';

class Error extends React.Component {
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

export default Error;
