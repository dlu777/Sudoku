import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './client/components/Home';
import Game from './client/components/Game';

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
