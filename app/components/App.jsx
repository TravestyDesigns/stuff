

import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    };
  }
  render() {
    const notes = this.state.notes;
    console.log(notes, "banana");
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <Notes items={notes} />
      </div>
);
}
addNote = () => {
  console.log("adding note")
  this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
  });
}
}
