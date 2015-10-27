 
var TodoActions=require("./TodoActions.js"); 
var TodoStore=require("./TodoStore.js"); 
var Route=require("react-route");
//,Link, DefaultRoute,  Redirect,NotFoundRoute,ActiveHandler 

// import {
//     Route,
//     Link ,
//     DefaultRoute,
//     Redirect,
//     NotFoundRoute,
//     ActiveHandler,
//     default as Router
// } from 'react-router';


// let NotFound = React.createClass({
//     render () {
//         return <div>404, Not Found!</div>
//     }
// });

// var AdminApp = React.createClass({

//     render(){
//         return (
//             <div>
//                 <Header />

//                 <div className="content-site">
//                     <Navs/>

//                     <div className="content-box">
//                         <ActiveHandler muiTheme={muiTheme} key={Date.now()}/>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// });

// var routes = (
//     <Route name='AdminApp' path="/" handler={AdminApp}>
//         <Route name="information" path="/information" handler={Information}/>
//         <Route name="information-detail" path="/information/id" handler={Information}/>
//         <Route name='news' path="/news" handler={News}/>
//         <Route name='news-detail' path="/news/:id" handler={News}/>
//         <Route name='workorder' path="/workorder" handler={WorkOrder}/>
//         <Route name='workorder-detail' path="/workorder/:id" handler={WorkOrder}/>
//         <DefaultRoute handler={News}/>
//         <NotFoundRoute handler={NotFound}/>
//     </Route>
// );


// Router.run(routes, function (Handler) {
//     React.withContext({muiTheme: muiTheme}, function () {
//         React.render(<Handler/>, document.getElementById("adminApp"));
//     });
// });

 
var App=React.createClass({ 

	componentDidMount() {
        TodoStore.listen(this.handleChange); 
    },
    componentWillUnmount() {
        TodoStore.unlisten(this.handleChange);
    },

    handleChange(pars){
    	console.log(pars);
    },

    handleClick(){
    	TodoActions.updateTodo("id","你好");
    },

	render(){ 
		return (<div > <input type="button" onClick={this.handleClick} value="点击" /> 

        <div className="Route">
        <Route path='/'>
          <h2>index</h2>
        </Route>
        <Route path='/me'>
          <h2>my is me</h2>
        </Route>
      </div>  </div>);   
	}

}); 

React.render(<App />,document.getElementById("body"));

