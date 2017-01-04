import React,{Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import {
	addTodo,
	completeTodo,
	setVisibilityFilter,
	VisibilityFilters
} from '../actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
	render() {
		const { dispatch, visibleTodos, visibilityFilter } = this.props;
		return (
			<div className="todo-list">
				<h1 className="todo-title">React todoList</h1>
				<TaskList todo={this.state.todoList} taskDel={this.handlerchange} taskComplete={this.handlerchange}></TaskList>
				<div className="hr"></div>
				<TaskCount todo={this.state.todoList}></TaskCount>
				<NewTask todo={this.state.todoList} newList={this.handlerchange}></NewTask>
			</div>
		)
	}
	getInitialState() {
		return {
			todoList: [{content:'d12421',complete:true},{content:'dsagfas',complete:false}]
		}
	}
	handlerchange(data) {
		this.setState({
			todoList: data
		})
	}
}
function selectTodos(todos, filter) {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
	}
}
// 这里的 state 是 Connect 的组件的
function select(state) {
	return {
		visibleTodos: selectTodos(state.todos, state.visibilityFilter),
		visibilityFilter: state.visibilityFilter
	};
}

export default connect(select)(App);