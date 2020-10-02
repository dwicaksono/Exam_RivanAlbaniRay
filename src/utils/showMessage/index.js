const {showMessage} = require('react-native-flash-message');

export const showError = (message) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: '#e4ff31',
    color: 'white',
  });
};

export const showSuccess = (message) => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: '#0e52b1',
    color: 'white',
  });
};
