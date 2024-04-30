import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
	const [userList, setUserList] = useState([])
	const [taskList, setTaskList] = useState([])

	useEffect(async () => {
		await getCurrentUsers()
	}, [])

	const getCurrentUsers = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users")
			const data = await response.json()
			setUserList(data.users)
		} catch (e) {
			console.error(e)
		}
	}

	const handlerName = async (e) => {
		try{
			const response = await fetch(`https://playground.4geeks.com/todo/users/${e.target.value}`)
			const data = await response.json()
			if(data.todos){
				setTaskList(data.todos)
			}
		}catch(e) {
			console.error(e)
		}
	}

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">To Do List</h1>
			<h3>Lista de usuarios actuales</h3>
			<ul className="list-group list-group-flush">

				{

					userList && userList.map((ele)=>{
						return (
							<li key={ele.id} className="list-group-item">{ele.name}</li>
						)
					})

				}
			</ul>

			<h3>Busca las tareas de tu usuario</h3>

			<input type="text" onChange={handlerName} />
			<ul className="list-group list-group-flush">

				{

					taskList && taskList.map((ele)=>{
						return (
							<li key={ele.id} className="list-group-item">{ele.label}</li>
						)
					})

				}
			</ul>
		</div>
	);
};

export default Home;
