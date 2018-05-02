import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Fullstack Sudoku</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Game')}>
          <View style={styles.button}>
            <Text adjustsFontSizeToFit={true} style={{fontSize:24, color: 'white'}}>Single Player</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Game')}>
          <View style={styles.button}>
            <Text adjustsFontSizeToFit={true} style={{fontSize:24, color: 'white'}}>Head to Head</Text>
          </View>
        </TouchableOpacity>
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
  button: {
    height: 40,
    width: 200,
    backgroundColor: 'dodgerblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    margin: 4
  },
});
