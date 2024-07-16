const form = document.getElementById("file-form");
const fileInput = document.getElementById("file");
const reader = new FileReader();

form.onsubmit = async (event) => {
	event.preventDefault();

	if (fileInput.files.length === 0) {
		console.error("Nenhum arquivo selecionado!");
		return;
	}

	const file = fileInput.files[0];

	if (!file.type === "text/csv") {
		console.error("Formato de arquivo inválido!");
		return;
	}

	// TODO: safe file name

	reader.readAsText(file);
	reader.onloadend = () => {
		const data = reader.result;
		const arr = data.split('\n');

		for (const l of arr) {
			console.log(l);
		}
	};
};
