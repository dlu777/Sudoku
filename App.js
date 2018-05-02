import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './app/components/Home';
import Game from './app/components/Game';

const RootStack = StackNavigator({
  Home: {
    screen: Home,
  },
  Game: {
    screen: Game
  }
},{
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
