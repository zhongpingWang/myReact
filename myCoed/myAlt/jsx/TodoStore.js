var alt=require("./Alt");
 
var TodoActions=require("./TodoActions.js"); 


class TodoStore {
  constructor() {
    this.bindListeners({
      updateTodo: TodoActions.updateTodo
    });

    this.state = {
      todos: []
    };
  }

  updateTodo(todo) {
    this.setState({ todos: this.state.todos.concat(todo) });
  }
}

module.exports=alt.createStore(TodoStore, 'TodoStore');