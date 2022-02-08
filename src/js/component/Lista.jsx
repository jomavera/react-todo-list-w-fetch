import React from "react";
import { useEffect, useState, useRef } from "react";
import { initializeUserAPI, actualizarTareasAPI } from "../api/TodoList.js";

const Lista = () => {
	const usuario = "jomavera";
	const [tareas, setTareas] = useState([]); // State array de tareas
	const [num, setNumero] = useState(0); // State para darle un ID  a cada tarea
	const [numItems, setNumItems] = useState(0); // State que alamacena numero de tareas
	const entradaUsuario = useRef("");

	//Corre solo cuando se monta componente
	useEffect(() => {
		initializeUserAPI(usuario);
	}, []);

	const anadirTarea = (e) => {
		if (e.key === "Enter") {
			let ix = num + 1;
			setNumero(ix);
			const nuevaLista = tareas.concat({
				id: ix,
				label: e.target.value,
				done: false,
			});
			actualizarTareasAPI(usuario, nuevaLista, setTareas, setNumItems);
		}
	};

	const quitarTarea = (id) => {
		const nuevaLista = tareas.filter((e) => e.id !== id);
		actualizarTareasAPI(usuario, nuevaLista, setTareas, setNumItems);
	};

	const tareasAnadidasHTML = tareas.map((e, i) => {
		return (
			<li className="list-group-item d-flex bg-light" key={e.id}>
				<div className="ms-2 me-auto">{e.label}</div>
				<button
					type="button"
					className="btn boton"
					onClick={() => quitarTarea(e.id)}>
					X
				</button>
			</li>
		);
	});
	return (
		<div className="container bg-light">
			<div className="row">
				<div className="col-12 p-2">
					<input
						type="text"
						className="form-control"
						ref={entradaUsuario}
						placeholder="Escriba su tarea"
						onKeyDown={anadirTarea}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-12 p-2">
					<ul className="list-group list-group-flush">
						{tareasAnadidasHTML}
					</ul>
				</div>
			</div>
			<div className="row">
				<div className="col-12 p-2">
					<p>
						<small>{numItems} items left</small>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Lista;
