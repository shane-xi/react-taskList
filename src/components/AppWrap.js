var React = require('react');
//父容器TodoList,子容器NewTask,和TaskList
var TodoList = React.createClass({
	render: function () {
		return (
			<div className="todo-list">
			<h1 className="todo-title">React todoList</h1>
		<TaskList todo={this.state.todoList} taskDel={this.handlerchange} taskComplete={this.handlerchange}></TaskList>
		<div className="hr"></div>
			<TaskCount todo={this.state.todoList}></TaskCount>
		<NewTask todo={this.state.todoList} newList={this.handlerchange}></NewTask>
		</div>
		)
	},
	getInitialState: function () {
		return {
			todoList: [{content:'d12421',complete:true},{content:'dsagfas',complete:false}]
		}
	},
	handlerchange: function (data) {
		this.setState({
			todoList: data
		})
	}
});

//展示任务清单，并有删除功能
/*
 * 这里有一个值得关注的点
 * 当我想给content添加标签时，如果直接对原来的state上的content修改，他就变成了一个
 * 对象，而不是之前的字符串，所以如果后面想通过切换去掉这个标签时，无法通过正则方式替换
 * 这个时候利用一个中间变量传递，就不会修改到原来的content变量。这个时候还得注意引用传递的
 *数据，防止其同样被修改
 */


var TaskList = React.createClass({
	render: function () {
		var listNode = this.props.todo.map((item,i)=>{
				return (
			<TaskItem item={item} i={i} key={i} handlerDel={this.handlerDel}></TaskItem>
		)
	});
		return (
			<ul onClick={this.handlerComplete}>
		{listNode}
		</ul>
		)
	},
	handlerComplete: function (e) {
		if (e.target.tagName == 'BUTTON') {
			return ;
		}
		var target = (e.target.tagName === 'LI' ? e.target :e.target.parentNode);
		var completeIndex = target.getAttribute('data-key');
		target.classList.toggle('true');
		var thisData = this.props.todo[completeIndex];
		thisData.complete = !thisData.complete;
		thisData.content = thisData.content.replace(/<\/?[^>]*>/gim, "");
		this.props.taskComplete(this.props.todo);
	},
	handlerDel: function (delIndex) {
		this.props.todo.splice(delIndex,1);
		this.props.taskDel(this.props.todo);
	}
});

var TaskItem = React.createClass({
	render: function () {
		var content = this.props.item.content;
		if (this.props.item.complete == true) {
			content = <s>{this.props.item.content}</s>;
		}
		return (
			<li key={this.props.i} className={"task-list "+this.props.item.complete}  data-key={this.props.i} onMouseOver={this.btnShow} onMouseOut={this.btnHide}>
		<lable className="task-content">{content}</lable>
			<button onClick={this.handlerDel} className="task-del" ref='delBtn' data-key={this.propsi} >删除</button>
		</li>
		)
	},
	handlerDel: function (e) {
		var delIndex = e.target.parentNode.getAttribute('data-key');
		this.props.handlerDel(delIndex)
	},
	btnShow: function () {
		this.refs.delBtn.getDOMNode().style.display = 'inline-block';
	},
	btnHide: function () {
		this.refs.delBtn.getDOMNode().style.display = 'none';
	}
})

//任务进度
var TaskCount = React.createClass({
	render: function () {
		var count = this.props.todo.length;
		var completeCount = this.props.todo.filter((item)=>{
				if (item.complete) {
			return item;
		}
	}).length;
		return (
			<p className="task-count">
			<span>已完成{completeCount}</span>/
		<span>总数{count}</span>
		</p>
		)
	}
})

//新增任务
var NewTask = React.createClass({
	render: function () {
		return (
			<form action="">
				<input className="add-content" type="text" placeholder="添加新任务" ref="inputNew"/>
				<button className="task-add btn" onClick={this.handlerAdd}>保存</button>
				<button className="task-cancel btn" onClick={this.handlerDel}>取消</button>
			</form>
		)
	},
	handlerAdd: function (e) {
		e.preventDefault();
		var inputNew = this.refs.inputNew.getDOMNode();
		var newText = inputNew.value.trim();
		var listData = this.props.todo;
		if(newText) {
			listData.push({content:newText,complete:false});
			this.props.newList(listData);
			inputNew.value = '';
		}
	},
	handlerDel: function (e) {
		e.preventDefault();
		var inputNew = this.refs.inputNew;
		inputNew.value = '';
	}
})

module.exports = TodoList;