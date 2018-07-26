import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const CounterButton = ({onPress, title}) => (
  <TouchableOpacity
     style={styles.button}
     onPress={onPress}>
     <Text style={styles.buttonText}>{title}</Text>
   </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default CounterButton;
