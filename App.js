import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Counter } from './components/Counter';
import {vibrate} from './utils'

export default class App extends React.Component {

  timerValues = [{
    name: 'work',
    time: 0.1
  }, {
    name: 'break',
    time: 0.1
  }];

  state = {
    currentTimer: 0
  }

  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
  }

  onComplete () {
    vibrate();
    console.log(this.state.currentTimer);
    this.setState(prevState => ({
      currentTimer: prevState.currentTimer + 1
    }));
  }

  render() {
    const timer = this.timerValues[(this.state.currentTimer % 2)]
    return (
      <View style={styles.container}>
        <Counter time={timer.time} onComplete={this.onComplete} name={timer.name}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
