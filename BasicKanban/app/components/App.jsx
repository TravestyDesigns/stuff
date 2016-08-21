

import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';
import {Paper, RaisedButton} from 'material-ui';

const MyRawTheme = require('../constants/post-it-raw-theme.js');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
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
      <div className="board">
      <Paper className="posty" zDepth={4} >
        <div className="plusbutton" >
          <RaisedButton label="+" primary={true} labelStyle={{padding:"0px", color:"#000"}} style={{width:"20px", float:"right"}} className="add-note" onClick={this.addNote}/>
        </div>
        <Notes items={notes} onEdit={this.editNote} onDelete={this.deleteNote} />
        </Paper>
      </div>
);
}
deleteNote = (id) => {
    const notes = this.state.notes;
    const noteIndex = this.findNote(id);

    if(noteIndex < 0) {
      return;
    }

    this.setState({
      notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
    });
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
editNote = (id, task) => {
   const notes = this.state.notes;
   const noteIndex = this.findNote(id);

   if(noteIndex < 0) {
     return;
   }

   notes[noteIndex].task = task;

   // shorthand - {notes} is the same as {notes: notes}
   this.setState({notes});
 }
 findNote = (id) => {
   const notes = this.state.notes;
   const noteIndex = notes.findIndex((note) => note.id === id);

   if(noteIndex < 0) {
     console.warn('Failed to find note', notes, id);
   }

   return noteIndex;
 }

}
module.exports = App;
