 
var alt=require("./Alt.js");

class TodoActions {
  updateTodo(id, text) { 
    return { id, text }
  }
}

 
module.exports=alt.createActions(TodoActions);