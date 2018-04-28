import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

class Tile extends Component {
  constructor(props){
    super(props);
    this.x = Math.floor(props.index/9);
    this.y = props.index%9;
    this.isSelected = false;
  }

  render() {
    // console.log('props', this.props, this.x, this.y, this.number)
    return (
      this.props.isSet ?
      (<View style={styles.box}>
        <Text style={this.props.isPressed ? styles.numbers : styles.numberBold}>{this.props.number}</Text>
      </View>) :
      (<TouchableHighlight onPress={event => this.props.onPressTile(event, this.props.index, this.x, this.y, this.props.number, this.isPressed)}>
        <View style={styles.box}>
          <Text style={this.props.isPressed ? styles.numbers : styles.numberBold}>{this.props.number}</Text>
        </View>
      </TouchableHighlight>)
    );
  }
}

class AvailableTile extends Component {

  render() {
    return (
      <TouchableHighlight onPress={event => this.props.onPressNumber(event, this.props.number)}>
        <View style={styles.available}>
          <Text style={styles.numbers}>{this.props.number}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class Game extends Component {
  constructor () {
    super();
    this.puzzleSolution = '864371259325849761971265843436192587198657432257483916689734125713528694542916378'.split('').map(num => +num);
    this.state = {
      puzzle: '004300209005009001070060043006002087190007400050083000600000105003508690042910300'.split('').map((num, index) => ({
        x: Math.floor(index/9),
        y: index%9,
        number: +num,
        isSet: +num !== 0,
        isSelected: false
      })),
      selectedTile: {x: 0, y: 0, index:0, number: 0},
      selectedNumber: 0,
      tileSelected: false,
      availableNumbers: [1,2,3,4,5,6,7,8,9]
    }
    this._onPressTile = this._onPressTile.bind(this);
    this._onPressNumber = this._onPressNumber.bind(this);
  }

  _onPressTile = (event, index, x, y, number, isPressed) => {
    console.log('press info', index, x, y, number)
    const {selectedTile, selectedNumber, tileSelected} = this.state;
    if(!tileSelected) {
      this.setState({
        puzzle: this.state.puzzle.map((tileObj, idx) => idx === index ? {...tileObj, number, isSelected: isPressed} : tileObj),
        selectedTile: {x, y, index, number},
        selectedNumber: number,
        tileSelected: true
      })
    } else {

    }
    if(tileSelected && isPressed) {

    } else {

    }
  }

  _onPressNumber = (event, number) => {
    console.log('number tile', number)
    const {selectedTile, selectedNumber, tileSelected} = this.state;
    if(tileSelected) this.setState({
      puzzle: this.state.puzzle.map((tileObj, idx) => idx === selectedTile.index ? {...tileObj, number} : tileObj),
      selectedNumber: number,
      selectedTile: {...selectedTile, number}
    })
  }

  render() {
    console.log('state', this.state)

    return (
      <View style={styles.container}>
        {this.state.puzzle.map((tileObj, idx) =>
          <Tile key={idx} index={idx} number={tileObj.number === 0 ? '' : tileObj.number} onPressTile={this._onPressTile}/>
        )}
        {this.state.availableNumbers.map(num =>
          <AvailableTile key={num} number={num} onPressNumber={this._onPressNumber}/>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'skyblue',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbers: {
    fontSize: 12,
  },
  numbersBold: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  available: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,

  }
});
