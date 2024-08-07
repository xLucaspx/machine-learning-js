import "//unpkg.com/brain.js";
import {
	fillInputOutputTable,
	fillClassificationTable,
	fillRate,
} from "./output.js";

// param 1: gordo
// param 2: perna curta
// param 3: faz au au

console.log("Aproximação");

let porco1 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: { porco: 1 },
};
let porco2 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: { porco: 1 },
};
let porco3 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: { porco: 1 },
};

let cachorro1 = {
	input: { gordo: 1, pernaCurta: 1, late: 1 },
	output: { cao: 1 },
};
let cachorro2 = {
	input: { gordo: 0, pernaCurta: 1, late: 1 },
	output: { cao: 1 },
};
let cachorro3 = {
	input: { gordo: 0, pernaCurta: 0, late: 1 },
	output: { cao: 1 },
};

let trainData = [porco1, porco2, porco3, cachorro1, cachorro2, cachorro3];

let network = new brain.NeuralNetwork();
network.train(trainData);

fillInputOutputTable("classification__aprox__table--train", trainData);

let misterioso1 = { input: { gordo: 1, pernaCurta: 1, late: 1 }, output: [0] }; // [0] dog
let misterioso2 = { input: { gordo: 1, pernaCurta: 1, late: 0 }, output: [1] }; // [1] pig
let misterioso3 = { input: { gordo: 0, pernaCurta: 0, late: 0 }, output: [0] }; // [0] neither

let teste = [misterioso1, misterioso2, misterioso3];
let resultado = [];

for (const item of teste) {
	const output = network.run(item.input);

	output.cao = output.cao.toFixed(3);
	output.porco = output.porco.toFixed(3);

	resultado.push({ input: item.input, output });
}

console.log({
	misterioso1: resultado[0],
	misterioso2: resultado[1],
	misterioso3: resultado[2],
});

fillInputOutputTable("classification__aprox__table--result", resultado);

console.log("Classificação (0 ou 1)");

porco1 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: [1],
};
porco2 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: [1],
};
porco3 = {
	input: { gordo: 1, pernaCurta: 1, late: 0 },
	output: [1],
};

cachorro1 = {
	input: { gordo: 1, pernaCurta: 1, late: 1 },
	output: [0],
};
cachorro2 = {
	input: { gordo: 0, pernaCurta: 1, late: 1 },
	output: [0],
};
cachorro3 = {
	input: { gordo: 0, pernaCurta: 0, late: 1 },
	output: [0],
};

trainData = [porco1, porco2, porco3, cachorro1, cachorro2, cachorro3];

network = new brain.NeuralNetwork();
network.train(trainData);

fillInputOutputTable("classification__assert__table--train", trainData);

resultado = [];

for (const item of teste) {
	const output = network.run(item.input);
	resultado.push(Math.round(output));
}

console.log({
	misterioso1: resultado[0],
	misterioso2: resultado[1],
	misterioso3: resultado[2],
});

const totalElementos = teste.length;
let acertos = 0;

for (let i = 0; i < totalElementos; i++) {
	if (teste[i].output == resultado[i]) {
		acertos++;
	}
}

const taxaAcertos = (100 * acertos) / totalElementos;
console.log("Total de elementos: ", totalElementos);
console.log("Total de acertos: ", acertos);
console.log(`Taxa de acertos: ${taxaAcertos}%`);

fillClassificationTable(
	"classification__assert__table--result",
	teste,
	resultado
);
fillRate("classification__assert__rate", taxaAcertos);
