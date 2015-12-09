var React = require('react');

class Index extends React.Component {


    constructor(props, context) {
        super(props, context);
    }

    render() { 

        return (<div className="index">
        	<pre>
        	    这是一个最基本的demo <br/>

        	    列表功能：<br/>

        	    	创建：点击创建<br/>

        	    	列表：点击修改<br/>

        	    	列表文字：点击删除<br/>

        	</pre>

        	</div>);
    }
}

module.exports=Index;