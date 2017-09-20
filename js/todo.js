function validate() {

	var form = document.myForm;
	if (form.Name.value == "") {
		alert("Please provide your name!");
		form.Name.focus();
		return false;
	}

	var emailID = form.EMail.value;
	if (emailID == "") {
		alert("Please provide your Email!");
		form.EMail.focus();
		return false;
	}
	var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!re.test(emailID)) {
		alert("Please enter correct email ID");
		form.EMail.focus();
		return false;
	}
	if (form.Role.value == "-1") {
		alert("Please provide your role!");
		return false;
	}
	return (true);
}

function getTodos() {
	var todos = new Array;
	var todosStr = localStorage.getItem('todo');
	if (todosStr !== null) {
		todos = JSON.parse(todosStr);
	}
	return todos;
}

function add() {
	var task1 = document.getElementById('name').value;
	var task2 = document.getElementById('role').value;
	var task3 = document.getElementById('email').value;
	console.log(task2);
	switch (task2) {
		case "1":
			var user = new Admin(task1, task3);
			break;
		case "2":
			var user = new Guest(task1, task3);
			break;
		case "3":
			var user = new User(task1, task3);
			break;
		default:
			break;
	}

	user.role();
	if (validate()) {
		var todos = getTodos();
		console.log(user)
		todos.push(user);
		localStorage.setItem('todo', JSON.stringify(todos));
	}
	show();

	return false;
}

function editData(ind, data) {
	var todos = getTodos();
	this.innerHTML = `<input type="text" value="${data}"/>`;
	this.firstElementChild.focus();
	this.firstElementChild.addEventListener('blur', () => {
		this.innerHTML = this.firstElementChild.value;
	todos[ind.slice(4)][ind.slice(0, 4)] = this.textContent;
	localStorage.setItem('todo', JSON.stringify(todos));
})
}

function show() {
	var todos = getTodos();
	var html = '<table id="dataTable" width="100%"><tr><th>Name</th><th>Role</th><th>Email</th></tr><tr>';
	var i = 0;
	todos.forEach ((val) => {
		html += `<td id="td_name${i}">` + val.name + '</td>'+
		`<td id="td_role${i}">` + val.role + '</td>' +
		`<td id="td_mail${i++}">` + val.mail + '</td>' + '</tr><tr>';
});
	html += '</table>';
	document.getElementById('todos').innerHTML = html;

	document.getElementById('dataTable').addEventListener('dblclick', function (e) {
		console.log(e.target);
		editData.call(e.target, (e.target.id).slice(3), e.target.textContent)
	});
}

document.getElementById('add').addEventListener('click', add);
show();

class Person {
	constructor(name, mail) {
		this.name = name;
		this.mail = mail;
	}
}

class User extends Person {
	role() {
		this.role = "User";
	}
}
class Admin extends Person {
	role() {
		this.role = "Admin";
	}
}
class Guest extends Person {
	role() {
		this.role = "Guest";
	}
}