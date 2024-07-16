import "//unpkg.com/brain.js";

const form = document.getElementById("file-form");
const fileInput = document.getElementById("file");
const reader = new FileReader();

const network = new brain.NeuralNetwork();

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
		const arr = data.split('\r\n');
		const header = arr.shift().split(',');

		const trainData = getTrainData(header, arr.slice(-10)); // últimas 10 linhas são tidas como verdadeiras

		network.train(trainData);

		const toBeTested = getDataToBeTested(header, arr.slice(0, - 10));
		let verdadeiros = 0;

		for (const line of toBeTested) {
			const output = line.output;
			const result = network.run(line.input);

			if (Math.round(result.comprou) == output) verdadeiros++
		}

		const totalElementos = toBeTested.length;
		console.log("Total de elementos: ", totalElementos);
		console.log("Verdadeiros: ", verdadeiros);
		console.log(`Taxa de acertos: ${(100 * verdadeiros) / totalElementos}%`);
	};
};

function getTrainData(header, inputs) {
	const dataArr = [];

	for (let line of inputs) {
		line = line.split(',');
		const outputPosition = header.length - 1;// o último valor é o output

		const input = {};
		const output = {};

		output[header[outputPosition]] = Number(line[outputPosition]);

		for (let i = 0; i < outputPosition; i++) {
			input[header[i]] = Number(line[i]); // preenche o objeto input com o nome do campo e seu valor
		}
		dataArr.push({ input, output });
	}

	return dataArr;
}

function getDataToBeTested(header, inputs) {
	const dataArr = [];

	for (let line of inputs) {
		line = line.split(',');
		const outputPosition = header.length - 1; // o último valor é o output

		const input = {};
		const output = Number(line[outputPosition]);

		for (let i = 0; i < outputPosition; i++) {
			input[header[i]] = Number(line[i]); // preenche o objeto input com o nome do campo e seu valor
		}
		dataArr.push({ input, output });
	}

	return dataArr;
}
