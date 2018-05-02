import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.x = Math.floor(props.index / 9);
    this.y = props.index % 9;
  }

  isRelated = () => {
    // const {x, y, index} = this.props.selectedTile
    // if(this.props.index === index) return false;
    // if(this.x === x || this.y === y) return true;
    // if(x <= 2 && y <= 2 && this.x <=2 && this.y <= 2) return true;
    // if(x <= 2 && y >= 3 && y <= 5 && this.x <= 2 && this.y >= 3 && this.y <= 5) return true;
    // if(x <= 2 && y >= 6 && this.x <=2 && this.y >= 6) return true;
    // if(x >= 3 && x <= 5 && y <= 2 && this.x >= 3 && this.x <= 5 && this.y <= 2) return true;
    // if(x >= 3 && x <= 5 && y >= 3 && y <= 5 && this.x >= 3 && this.x <= 5 && this.y >= 3 && this.y <= 5) return true;
    // if(x >= 3 && x <= 5 && y >= 6 && this.x >= 3 && this.x <= 5 && this.y >= 6) return true;
    // if(x >= 6 && y <= 2 && this.x >= 6 && this.y <= 2) return true;
    // if(x >= 6 && y >= 3 && y <= 5 && this.x >= 6 && this.y >= 3 && this.y <= 5) return true;
    // if(x >= 6 && y >= 6 && this.x >= 6 && this.y >= 6) return true;
    return false;
  }

  isSameNumber = () => {
    return this.props.selectedTile.number === this.props.tileObj.number;
  }

  render() {
    // console.log('props', this.props)
    const { tileObj, index, selectedTile, onPressTile, checkAnswers} = this.props
    return (
      tileObj.isSet ?
        (<View style={this.isRelated() ? styles.boxSetRelated : styles.boxSet}>
          <Text style={this.isSameNumber() ? {fontWeight: 'bold', color: 'yellow'} : {fontWeight: 'bold'}}>{tileObj.number}</Text>
        </View>) :
        (<TouchableHighlight onPress={event => onPressTile(event, index, this.x, this.y, tileObj.number)}>
          {index === selectedTile.index ?
            (<View style={styles.boxHighlighted}>
              <Text style={checkAnswers && !tileObj.isCorrect ? {fontWeight: 'bold', color: 'red'} : {fontWeight: 'bold'}}>{tileObj.number}</Text>
            </View>) :
            (<View style={this.isRelated() ? styles.boxRelated : styles.box}>
              <Text style={checkAnswers && !tileObj.isCorrect ? {color: 'red'} : {}}>{tileObj.number}</Text>
            </View>)}
        </TouchableHighlight>)
    );
  }
}

class AvailableTile extends Component {

  render() {
    return (
      <TouchableHighlight onPress={event => this.props.onPressNumber(event, this.props.number)}>
        <View style={styles.available}>
          <Text>{this.props.number}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

class Timer extends Component {
  state = {count: 0}

  componentDidMount() {
    setInterval(() => {
      this.setState({count: this.state.count + 1})
    }, 1000)
  }

  render() {
    const {count} = this.state;
    const mins = Math.floor(count/60);
    const secs = count % 60;
    return (
      <Text style={{fontSize: 20}}>
        {mins}:{secs > 9 ? secs : '0' + secs}
      </Text>
    )
  }
}

export default class Game extends Component {
  static navigationOptions = {
    headerRight: <Timer />
  };

  constructor() {
    super();
    this.puzzleSolution = '864371259325849761971265843436192587198657432257483916689734125713528694542916378'.split('').map(num => +num);
    this.state = {
      puzzle:
      // '004300209005009001070060043006002087190007400050083000600000105003508690042910300'
      '864371259325849761971265843436192587198657432257483916689734125713528694542916370'
      .split('').map((num, index) => ({
        x: Math.floor(index / 9),
        y: index % 9,
        number: num === '0' ? '' : +num,
        isSet: +num !== 0,
        isCorrect: +num === this.puzzleSolution[index]
      })),
      selectedTile: { x: '', y: '', index: '', number: 0 },
      selectedNumber: 0,
      tileSelected: false,
      availableNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      checkAnswers: false,
      isDone: false,
    }
    this._onPressTile = this._onPressTile.bind(this);
    this._onPressNumber = this._onPressNumber.bind(this);
  }

  _onPressTile = (event, index, x, y, number) => {
    console.log('press info', index, x, y, number)
    const { puzzle, selectedTile, selectedNumber, tileSelected } = this.state;
    if (!tileSelected) {
      this.setState({
        puzzle: puzzle.map((tileObj, idx) => idx === index ? { ...tileObj, number } : tileObj),
        selectedTile: { x, y, index, number },
        selectedNumber: number,
        tileSelected: true
      })
    } else {
      this.setState({
        // puzzle: this.state.puzzle.map((tileObj, idx) => idx === index ? {...tileObj, number} : tileObj),
        selectedTile: { x, y, index, number },
        selectedNumber: number,
      })
    }
  }

  _onPressNumber = (event, number) => {
    console.log('number tile', number)
    const { puzzle, selectedTile, selectedNumber, tileSelected } = this.state;
    if (tileSelected) this.setState({
      puzzle: puzzle.map((tileObj, idx) => idx === selectedTile.index ? { ...tileObj, number, isCorrect: number === this.puzzleSolution[idx]} : tileObj),
      selectedNumber: number,
      selectedTile: { ...selectedTile, number},
    }, this.checkIfDone)
  }

  _onPressDelete = event => {
    const { puzzle, selectedTile, selectedNumber, tileSelected } = this.state;
    if (tileSelected) this.setState({
      puzzle: puzzle.map((tileObj, idx) => idx === selectedTile.index ? { ...tileObj, number: '' } : tileObj),
      selectedNumber: '',
      selectedTile: { ...selectedTile, number: '' },
    })
  }

  _onSwipe = event => {

  }

  _checkAnswers = () => {
    console.log('running check')
    this.setState({
      puzzle: this.state.puzzle.map((tileObj, idx) => ({ ...tileObj, isCorrect: tileObj.number === this.puzzleSolution[idx] })),
      checkAnswers: true
    })
  }

  _clearAnswers = () => {
    console.log('running clear')
    this.setState({
      puzzle: this.state.puzzle.map(tileObj => ({ ...tileObj, isCorrect: tileObj.isSet || false })),
      checkAnswers: false
    })
  }

  checkIfDone = () => {
    this.setState({isDone: this.puzzleSolution.map(num => num.toString()).join('') === this.state.puzzle.map(obj => obj.number.toString()).join('')});
  }

  render() {
    console.log('state', this.state)
    console.log('solution', this.puzzleSolution.map(num => num.toString()).join(''))
    console.log('puzzle', this.state.puzzle.map(obj => obj.number.toString()).join(''))
    const { puzzle, selectedTile, selectedNumber, availableNumbers, checkAnswers } = this.state;
    return (
      <View style={styles.container}>
        {puzzle.map((tileObj, idx) =>
          <Tile key={idx} index={idx} selectedTile={selectedTile} tileObj={tileObj} checkAnswers={checkAnswers} onPressTile={this._onPressTile} />
        )}
        {availableNumbers.map(num =>
          <AvailableTile key={num} number={num} onPressNumber={this._onPressNumber} />
        )}
        <TouchableOpacity onPress={this._onPressDelete}>
          <View style={styles.deleteButton}>
            <Text adjustsFontSizeToFit={true} style={{fontSize:30}}>X</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={checkAnswers ? this._clearAnswers : this._checkAnswers}>
          <View style={styles.checkAnswers}>
            {checkAnswers ?
              <Text adjustsFontSizeToFit={true} >Exit Check Mode</Text> :
              <Text adjustsFontSizeToFit={true} >Check Answers</Text>}
          </View>
        </TouchableOpacity>
        {this.state.isDone &&
          <View style={styles.message}>
            <Text adjustsFontSizeToFit={true} style={{fontSize:30}}>You Finished the Puzzle!</Text>
          </View>}
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
  boxSet: {
    width: 40,
    height: 40,
    backgroundColor: 'skyblue',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSetRelated: {
    width: 40,
    height: 40,
    backgroundColor: 'bisque',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'lightcyan',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxRelated: {
    width: 40,
    height: 40,
    backgroundColor: 'bisque',
    borderColor: 'black',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHighlighted: {
    width: 40,
    height: 40,
    backgroundColor: 'lightcyan',
    borderColor: 'green',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  available: {
    width: 40,
    height: 40,
    backgroundColor: 'linen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'navy',
    borderWidth: 2,
    marginVertical: 4
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: 'firebrick',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'navy',
    borderWidth: 2,
    marginHorizontal: 4
  },
  checkAnswers: {
    height: 40,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'navy',
    borderWidth: 2,
    marginHorizontal: 4
  },
  message: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
