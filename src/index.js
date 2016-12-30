require('./styles/main.css');    // 引入样式表
var React = require('react');
var AppWrap = require('AppWrap'); //加载组件
//var createRedux = require('redux').createRedux;
//var Provider = require('redux/react').Provider;
//var stores = require('AppStore');
var app = document.getElementById('app');

/*var App = React.createClass({
	render: function() {
		return (
			<Provider redux={redux}>
			{function() { return <AppWrap />; }}
			</Provider>
		);
	}
});*/
var App = React.createClass({
	render: function () {
		return (
			<AppWrap/>
		)
	}
})

React.render(
	<App/>,
	app
);