import {
	getCsvAsArray,
	getFileAsText,
	getNeuralNetworkData,
} from "./functions.js";
import {
	fillClassificationTable,
	fillRate,
	fillInputOutputTable,
} from "./output.js";
import "//unpkg.com/brain.js";

const network = new brain.NeuralNetwork();

const text = await getFileAsText("../files/acesso.csv");
const csv = getCsvAsArray(text);

const data = getNeuralNetworkData(csv);

const trainData = data.slice(-10);
const testData = data.slice(0, -10);

network.train(trainData);

fillInputOutputTable("access__table--train", trainData);

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
	Arquivo acesso.csv
	Total de elementos: ${totalElementos}
	Verdadeiros: ${verdadeiros}
	Taxa de acertos: ${taxaVerdadeiros} %
`);

fillClassificationTable("access__table--result", testData, resultArr);
fillRate("access__rate", taxaVerdadeiros);
