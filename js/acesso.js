import { getCsvAsArray, getFileAsText } from "./functions.js";
import "//unpkg.com/brain.js";

const network = new brain.NeuralNetwork();

console.log("Arquivo acesso.csv");

const text = await getFileAsText("../files/acesso.csv");
const { header, data } = getCsvAsArray(text);

const trainData = getTrainData(header, data.slice(-10)); // últimas 10 linhas são tidas como verdadeiras

network.train(trainData);

const toBeTested = getDataToBeTested(header, data.slice(0, -10));
let verdadeiros = 0;

for (const line of toBeTested) {
	const output = line.output;
	const result = network.run(line.input);

	if (Math.round(result.comprou) == output) verdadeiros++;
}

const totalElementos = toBeTested.length;
console.log("Total de elementos: ", totalElementos);
console.log("Verdadeiros: ", verdadeiros);
console.log(`Taxa de acertos: ${(100 * verdadeiros) / totalElementos}%`);

// Funções:

function getTrainData(header, inputs) {
	const dataArr = [];

	for (let line of inputs) {
		const outputPosition = header.length - 1; // o último valor é o output

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
