 
// react route  都是页面引入 不会打包到一个文件中  其余的js都会到 js/app.js 中

//Alt
// var TodoActions=require("./TodoActions.js"); 
// var TodoStore=require("./TodoStore.js");  


var TodoActions={};
 var TodoStore={ listen:function(){},unlisten:function(){}};
//router  http://undefinedblog.com/react-router-0-13-3/
var React=require("react");
var ReactRouter=require("react-router");
var Router = ReactRouter; // 由于是html直接引用的库，所以 ReactRouter 是以全局变量的形式挂在 window 上
var Route = ReactRouter.Route; 
var RouteHandler = ReactRouter.RouteHandler;
var Link = ReactRouter.Link;
var StateMixin = ReactRouter.State; 
var DefaultRoute=Router.DefaultRoute;
var NotFoundRoute=Router.NotFoundRoute;
var ActiveHandler=Router.ActiveHandler;  

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
    },

    //点击事件
    handleClick(){
    	TodoActions.updateTodo("id","你好");
    },

    //渲染
  	render(){ 
  		return (<div >
           <input type="button" onClick={this.handleClick} value="点击" />  
           <RouteHandler key={Date.now()} />
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



var routes = (
	  <Route handler={App}  path="/">
	    <Route path="/index" handler={Index}/>
	    <Route path="/list" handler={List}/>
	    <DefaultRoute handler={Index}/>
	    <NotFoundRoute handler={NotFound}/>
	  </Route>
);
 


// 将匹配的路由渲染到 DOM 中
Router.run(routes, Router.HashLocation, function(Handler){
  // withContext http://segmentfault.com/a/1190000002878442 
    React.render(<Handler />,document.getElementById("body"));
 
}); 

