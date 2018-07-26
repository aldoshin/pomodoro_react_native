import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button, View, StyleSheet } from 'react-native';
import CounterButton from './CounterButton';
import {vibrate} from '../utils'

export class Counter extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState(props);
  }

  getInitialState = (props) => ({
    timer: props.time * 60,
    running: false
  })

  decrement = () => {
    if (this.state.timer === 0) {
      this.props.onComplete();
      clearInterval(this.counter);
    } else {
      this.setState((prevState) => ({
        timer: prevState.timer - 1
      }));
    }
  }

  onReset = () => {
    clearInterval(this.counter);
    this.setState(() => this.getInitialState(this.props));
  }

  onStart = () => {
    this.counter = setInterval(this.decrement, 1000);
    this.setState((prevState) => ({running: true}));
  }

  onPause = () => {
    clearInterval(this.counter);
    this.setState({
      running: false
    });
  }

  renderButtons = () => {
    const btnProps = this.state.running ? {
      onPress: this.onPause,
      title: 'Pause'
    } : {
      title: 'Start',
      onPress: this.onStart
    };

    return (
      <View style={styles.buttonContainer}>
        <CounterButton {...btnProps}/>
        <CounterButton onPress={this.onReset} title="Reset"/>
      </View>
    );
  }

  componentWillUnmount() {
    this.counter && clearInterval(this.counter);
  }


  render() {
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer % 60;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{this.props.name.toUpperCase()} TIMER</Text>
        <Text style={styles.counter}>{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</Text>
        {this.renderButtons()}
      </View>
    );

  }
}

Counter.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  counter: {
    fontSize: 60
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10
  }
})
