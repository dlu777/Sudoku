import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Fullstack Sudoku</Text>
        <Button
          title="Single Player"
          onPress={() => this.props.navigation.navigate('Game')}
        />
        <Text>Head-to-Head</Text>
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
