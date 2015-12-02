
var TodoActions=require("./TodoActions.jsx"); 
var TodoStore=require("./TodoStore.jsx");    
var React=require("react"); 
var ReactDOM= require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link 
require('../less/index.less');
let {createHashHistory} = require('history'); 

//router not found
var NotFound = React.createClass({
    render () {
        return <div>404, Not Found!</div>
    }
});


//react
var App=React.createClass({ 

  //前段只执行一次
	componentDidMount() {
      TodoStore.listen(this.handleChange); 
  },

    //销毁
    componentWillUnmount() {
        TodoStore.unlisten(this.handleChange);
    },

    //改变回调
    handleChange(pars){
    	console.log(pars);
      console.log(3);
    },

    //点击事件
    handleClick(){
    	TodoActions.updateTodo("id","你好");
    },

    //渲染
  	render(){ 
  		return (<div >
           <input type="button" onClick={this.handleClick} value="点击" />  
           {this.props.children}
        </div>);   
  	}

});  

//route index
var Index=React.createClass({ 
    render(){
        return (<h2>index</h2>);
    }
}); 

//react list
var List=React.createClass({ 
    render(){
        return (<h2>List</h2>);
    }
}); 
 
 

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: Index },
    childRoutes: [
      { path: 'index', component: Index },
      { path: 'index/:id', component: Index },
      { path: 'list', component: List },
      { path: 'list/:id', component: List }
  
    ]
  }
]

let history = createHashHistory({queryKey: false});

ReactDOM.render(<Router routes={routeConfig} history={history}/>,document.getElementById("body"))


 
