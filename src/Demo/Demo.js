import React, { Component } from 'react';
import { Stage, Layer, Text, Circle } from 'react-konva';
import CoinImage from '../images/shiny-coin1.svg'
import './Demo.css'

function generateItems() {
  const items = [];
  const phrases = ['SMILE', 'You are worth it!', 'Today is the day', 'You got this!', 'Believe in yourself', 'You are not alone!', 'We are all beautiful', 'Your potential has no limits']
  for (let i = 0; i < 10; i++) {
    if (phrases[i]) {
      items.push({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100),
        id: 'node-' + i,
        text: phrases[i]
      });
    }
  }
  return items;
}

class Demo extends Component {
  state = {
    items: generateItems()
  };
  handleDragStart = e => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = items.find(i => i.id === id);
    const index = items.indexOf(item);
    // remove from the list:
    items.splice(index, 1);
    // add to the top
    items.push(item);
    this.setState({
      items
    });
  };
  onDragEnd = e => {
    const id = e.target.name();
    const items = this.state.items.slice();
    const item = this.state.items.find(i => i.id === id);
    const index = this.state.items.indexOf(item);
    // update item position
    items[index] = {
      ...item,
      x: e.target.x(),
      y: e.target.y()
    };
    this.setState({ items });
  };
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {this.state.items.map(item => (
              <Text
                text={item.text}
                key={item.id}
                name={item.id}
                fillPatternImage={CoinImage}
                draggable
                x={item.x}
                y={item.y}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
              />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default Demo;

