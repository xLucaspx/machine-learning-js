import "//unpkg.com/brain.js";

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

let network = new brain.NeuralNetwork();
network.train([porco1, porco2, porco3, cachorro1, cachorro2, cachorro3]);

let misterioso1 = { gordo: 1, pernaCurta: 1, late: 1 }; // [0] dog
let misterioso2 = { gordo: 1, pernaCurta: 1, late: 0 }; // [1] pig
let misterioso3 = { gordo: 0, pernaCurta: 0, late: 0 }; // [0] neither

let teste = [misterioso1, misterioso2, misterioso3];
let resultado = [];

for (const input of teste) {
	const output = network.run(input);
	resultado.push(output);
}

console.log({
	misterioso1: resultado[0],
	misterioso2: resultado[1],
	misterioso3: resultado[2],
});

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

network = new brain.NeuralNetwork();
network.train([porco1, porco2, porco3, cachorro1, cachorro2, cachorro3]);

resultado = [];
const expected = [0, 1, 0];

for (const input of teste) {
	const output = network.run(input);
	resultado.push(Math.round(output));
}

console.log({
	misterioso1: resultado[0],
	misterioso2: resultado[1],
	misterioso3: resultado[2],
});

const totalElementos = expected.length;
let acertos = 0;

for (let i = 0; i < expected.length; i++) {
	if (expected[i] == resultado[i]) {
		acertos++;
	}
}

console.log("Total de elementos: ", totalElementos);
console.log("Total de acertos: ", acertos);
console.log(`Taxa de acertos: ${(100 * acertos) / totalElementos}%`);
