import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Button = ({type, onPress, title, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.container(type)}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor: type === 'secondary' ? '#e74c3c' : '#0e52b1',
    paddingVertical: 10,
    borderRadius: 10,
  }),
  text: {
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
  },
});
