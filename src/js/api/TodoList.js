const imprimirRespuesta = (contexto, data) => {
	console.log(contexto + ": " + JSON.stringify(data));
};

async function actualizarEstados(usuario, setFunction1, setFunction2) {
	const response = await fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/${usuario}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	let data = await response.json();
	setFunction1(data);
	setFunction2(data.length);
}

async function initializeUserAPI(user) {
	let resp = await fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/${user}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	resp = await resp.json();
	imprimirRespuesta("resultado elminiar usuario", resp);
	let resp2 = await fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/${user}`,
		{
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	resp2 = await resp2.json();
	imprimirRespuesta("resultado crear usuario", resp2);
}

async function actualizarTareasAPI(user, tareas, setFunction1, setFunction2) {
	let resp = await fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/${user}`,
		{
			method: "PUT",
			body: JSON.stringify(tareas),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	resp = await resp.json();
	actualizarEstados(user, setFunction1, setFunction2);
	imprimirRespuesta("tareas actualizadas", resp.result);
}

export { initializeUserAPI, actualizarTareasAPI };
