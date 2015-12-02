 
var alt=require("./Alt.jsx");

class TodoActions {
	
  updateTodo(id, text) { 
    return { id, text }
  }
}

 
module.exports=alt.createActions(TodoActions);