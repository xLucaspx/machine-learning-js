import "//unpkg.com/brain.js";
import {
	getCsvAsArray,
	getFileAsText,
	getNeuralNetworkData,
} from "./functions.js";

console.log("Arquivo acesso.csv");

const network = new brain.NeuralNetwork();

const text = await getFileAsText("../files/acesso.csv");
const csv = getCsvAsArray(text);

const data = getNeuralNetworkData(csv);

const trainData = data.slice(-10);
const testData = data.slice(0, -10);

network.train(trainData);

let verdadeiros = 0;

for (const line of testData) {
	const output = line.output;
	const result = network.run(line.input);

	if (Math.round(result) == output) verdadeiros++;
}

const totalElementos = testData.length;
console.log("Total de elementos: ", totalElementos);
console.log("Verdadeiros: ", verdadeiros);
console.log(`Taxa de acertos: ${(100 * verdadeiros) / totalElementos}%`);
