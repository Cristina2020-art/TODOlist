window.onload = function(){
	const date = new Date();
	const dateBox = document.querySelector('.date');
	dateBox.innerHTML = "Date: <span>"+date.getDate() + '-' + date.getMonth()+ '-'+ date.getFullYear() + "</span>";


	// handling todo list
	const form = document.querySelector('form');
	let list = document.querySelector('.list');
	let id = 1;
	if(JSON.parse(localStorage.getItem("todoItems")) === null || JSON.parse(localStorage.getItem("todoItems")).length == 0){
		id = 1;
	}else{
		id = JSON.parse(localStorage.getItem("todoItems"))[JSON.parse(localStorage.getItem("todoItems")).length -1].id+1 ;
		JSON.parse(localStorage.getItem("todoItems")).map(todo=>{

			let div = document.createElement('div');
			div.setAttribute("class","listItem");
			let input = document.createElement('input');
			input.setAttribute("type","checkbox");
			input.setAttribute("id",todo.id);
			div.append(input);
			let h1 = document.createElement('h1');
			h1.setAttribute("class","itemHeading");
			h1.innerHTML = todo.todo;
			div.append(h1);
			list.append(div);
		});
	}
	const inputs = document.querySelectorAll('input[type="checkbox"]');
	let nonDItems = [];
	for(let i =0; i<inputs.length; i++){
		inputs[i].addEventListener("click",e=>{
			JSON.parse(localStorage.getItem("todoItems")).map(todo=>{
				if(todo.id != e.target.id){
					nonDItems.push(todo);
				}
				localStorage.setItem("todoItems",JSON.stringify(nonDItems));
			});
				window.location.reload();
				alert('well Done!');
		});
	}

	//form submit
	form.onsubmit = e=>{
		e.preventDefault();
		const value = e.target.name.value;
		if(value == ''){
			alert('Please enter something');
		}else{
			let items = [];
			let item = {
						id:id,
						todo:value
					};
			if(JSON.parse(localStorage.getItem("todoItems")) === null){
				items.push(item);
				localStorage.setItem('todoItems',JSON.stringify(items));
				window.location.reload();
				alert('successfully added!');
			}else{
				JSON.parse(localStorage.getItem("todoItems")).map(todo=>{
					items.push(todo);
				});
				items.push(item);
				localStorage.setItem('todoItems',JSON.stringify(items));
				window.location.reload();
				alert('successfully added!');
			}
		}
	}
}