import "//unpkg.com/brain.js";
import { getCsvAsArray, getFileAsText } from "./functions.js";
import {
	fillClassificationTable,
	fillInputOutputTable,
	fillRate,
} from "./output.js";

const network = new brain.NeuralNetwork();

const text = await getFileAsText("../files/cursos.csv");
const csv = getCsvAsArray(text);

const data = transformCsv(csv);

const trainData = data.slice(-10);
const testData = data.slice(0, -10);

network.train(trainData);

fillInputOutputTable("courses__table--train", trainData);

let verdadeiros = 0;
const resultArr = [];

for (const line of testData) {
	const output = line.output;
	const result = Math.round(network.run(line.input));
	resultArr.push(result);

	if (result == output) verdadeiros++;
}

const totalElementos = testData.length;
const taxaVerdadeiros = ((100 * verdadeiros) / totalElementos).toFixed(2);
console.log(`
	Arquivo cursos.csv
	Total de elementos: ${totalElementos}
	Verdadeiros: ${verdadeiros}
	Taxa de acertos: ${taxaVerdadeiros} %
`);

fillClassificationTable("courses__table--result", testData, resultArr);
fillRate("courses__rate", taxaVerdadeiros);

/**
 *
 * @param {CSV} csv
 * @returns {NeuralNetworkData[]}
 */
function transformCsv(csv) {
	const trainData = [];
	const { header, data } = csv;
	const outputPosition = header.length - 1; // o último valor é o output

	const strValues = [];
	for (let line of data) {
		const input = {};
		const output = [Number(line[outputPosition])];

		for (let i = 0; i < outputPosition; i++) {
			const lineData = line[i];

			if (isNaN(lineData)) {
				if (!strValues.includes(lineData)) {
					strValues.push(lineData);
				}
				input[header[i]] = strValues.indexOf(lineData);
				continue;
			}

			input[header[i]] = Number(line[i]);
		}

		trainData.push({ input, output });
	}

	return trainData;
}
