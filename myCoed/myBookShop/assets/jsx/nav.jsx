var React = require('react');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link 

var navs=[
    {
        name:"首页",
        hash:"index"
    },
    {
        name:"列表",
        hash:"list"
    } 
];

class Navs extends React.Component {


    constructor(props, context) {
        super(props, context);
    }

    render() {

        var list=navs.map((nav)=>{
            return (<li key={nav.hash} className="item"><Link activeClassName="active" className="title" to={"/"+nav.hash}>{nav.name}</Link></li>);
        });


        return (<div className="nav-box"><ul>{list}</ul></div>);
    }
}

module.exports=Navs;