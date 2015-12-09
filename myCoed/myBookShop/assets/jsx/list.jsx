var React = require('react');

class List extends React.Component {


    constructor(props, context) {
        super(props, context);
           this.state={
            list:[]
        }
    }


    createNew(){
    	var name=prompt("输入列表名称:");
    	this.state.list.push(name);
    	this.setState({list:this.state.list});

    }

    editItem(item,i){
    	var name=prompt("输入新名称:",item),list=this.state.list;
    	list[i]=name; 
    	this.setState({list:list});
    }

    deleteItem(i,event){
    	
    	 event.stopPropagation();
    	
    	if (confirm("确认删除？")) {
    		var list=this.state.list;
    		list.splice(i,1);
    	    this.setState({list:list});
    	};
    	
    }

    render() { 


    	var list=this.state.list,items;

    	if (list.length>0) {
    		items=list.map((item,i)=>{
    			return (<li className="item" key={i} onClick={this.editItem.bind(this,item,i)}><span onClick={this.deleteItem.bind(this,i)}>{item}</span></li>);
    		});
    	}else{
    		items=(<li className="null">暂无数据</li>);
    	}


        return (<div className="listBox">

        	 <span className="create" onClick={this.createNew.bind(this)}>create</span>

        	 <ul className="demo-list">
        	 	{items}
        	 </ul>
        	</div>);
    }
}

module.exports=List;