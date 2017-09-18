function validate() {

	if (document.myForm.Name.value == "") {
		alert("Please provide your name!");
		document.myForm.Name.focus();
		return false;
	}

	if (document.myForm.EMail.value == "") {
		alert("Please provide your Email!");
		document.myForm.EMail.focus();
		return false;
	}
	var emailID = document.myForm.EMail.value;
	atpos = emailID.indexOf("@");
	dotpos = emailID.lastIndexOf(".");

	if (atpos < 1 || (dotpos - atpos < 2)) {
		alert("Please enter correct email ID")
		document.myForm.EMail.focus();
		return false;
	}


	if (document.myForm.Role.value == "-1") {
		alert("Please provide your role!");
		return false;
	}
	return (true);
}

function get_todos() {
	var todos = new Array;
	var todos_str = localStorage.getItem('todo');
	if (todos_str !== null) {
		todos = JSON.parse(todos_str);
	}
	return todos;
}

function add() {
	var task1 = document.getElementById('name').value;
	var task2 = document.getElementById('role').value;
	var task3 = document.getElementById('email').value;

	if (validate()) {
		var todos = get_todos();
		todos.push(task1, task2, task3);
		localStorage.setItem('todo', JSON.stringify(todos));
	}
	show();

	return false;
}

function editData(ind, data) {
	var todos = get_todos();
	this.innerHTML = `<input type="text" value="${data}"/>`;
	this.firstElementChild.focus();
	this.firstElementChild.addEventListener('blur', () => {
		this.innerHTML = this.firstElementChild.value;
	console.log(todos);
	todos[ind] = this.textContent;
	localStorage.setItem('todo', JSON.stringify(todos));
})
}

function show() {
	var todos = get_todos();
	var html = '<table id="dataTable" width="100%"><tr><th>Name</th><th>Role</th><th>Email</th></tr><tr>';
	for (var i = 0; i < todos.length; i++) {
		html += `<td id="td_${i}">` + todos[i] + '</td>';
		if ((i >= 2) & ((i + 1) % 3 == 0)) {
			html += '</tr><tr>';
		}
	};
	html += '</table>';
	document.getElementById('todos').innerHTML = html;

	document.getElementById('dataTable').addEventListener('dblclick', function (e) {
		console.log(e.target);
		editData.call(e.target, (e.target.id).slice(3), e.target.textContent)
	});
}

document.getElementById('add').addEventListener('click', add);

show();