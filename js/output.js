import "./types.js";

/**
 * Preenche a tabela que possui o ID informado no HTML com os dados de _input_ e _output_ passados por parâmetro.
 *
 * @param {String} tableId O ID da tabela que deve ser preenchida no HTML
 * @param {NeuralNetworkData[]} data Array de objetos contendo as informações no formato consumido pela rede neural
 */
function fillInputOutputTable(tableId, data) {
	const table = document.getElementById(tableId);
	const tableHeaderRow = table.querySelector("thead>tr");
	const tableBody = table.querySelector("tbody");

	const headerFields = [...Object.keys(data[0].input), "output"];
	createTableHeader(tableHeaderRow, headerFields);

	// populando tabela com dados
	data.forEach((d) => {
		createTrainTr(tableBody, d);
	});
}

/**
 * Preenche a tabela que possui o ID informado no HTML com os dados de _input_ e _output_ da classificação passados por parâmetro,
 * comparando o resultado esperado com o atual.
 *
 * @param {String} tableId O ID da tabela que deve ser preenchida no HTML
 * @param {NeuralNetworkData[]} testData Array de objetos sendo que o campo `input` contém os dados que foram testados pela rede neural
 * e o campo `output` os resultado esperado
 * @param {Number[]} result Array numérico contendo o valor devolvido como saída pela rede neural; será comparada com o valor de
 * `output` para cada objeto de `testData`, logo as posições também devem ser correspondentes
 */
function fillClassificationTable(tableId, testData, result) {
	const table = document.getElementById(tableId);
	const tableHeaderRow = table.querySelector("thead>tr");
	const tableBody = table.querySelector("tbody");

	const headerFields = [...Object.keys(testData[0].input), "esperado", "atual"];
	createTableHeader(tableHeaderRow, headerFields);

	// populando tabela com dados
	for (let i = 0; i < testData.length; i++) {
		createClassificationTr(tableBody, testData[i], result[i]);
	}
}

/**
 * Busca um elemento `<p>` de ID correspondente no HTML e insere nele a taxa de acertos passada por parâmetro.
 *
 * @param {String} pId ID do elemento `<p>` que será preenchido no HTML
 * @param {Number} rate Taxa de acertos que será inserida no elemento `<p>`
 */
function fillRate(pId, rate) {
	const p = document.getElementById(pId);
	p.innerHTML = `Taxa de acertos: ${rate}%`;
}

/**
 * Recebe um array contendo o conteúdo do cabeçalho e a referência para a `tr` em que cada elemento deve ser inserido.
 * Cria uma célula `th` para cada conteúdo, já contendo a estilização utilizada pelo sistema.
 *
 * @param {HTMLTableRowElement} headerRow A linha da tabela na qual o cabeçalho deve ser criado
 * @param {String[]} content O conteúdo a ser exibido no cabeçalho da tabela
 */
function createTableHeader(headerRow, content) {
	content.forEach((element) => {
		const th = document.createElement("th");
		th.classList.add("table__header");
		th.innerHTML = element;
		headerRow.appendChild(th);
	});
}

/**
 * Cria uma célula `td` com o conteúdo informado e insere na linha da tabela que foi passada por parâmetro.
 * Já insere as classes de estilização utilizadas peo sistema.
 *
 * @param {HTMLTableRowElement} tableRow A linha da tabela na qual a célula criada deve ser inserida
 * @param {String} content O conteúdo a ser exibido na célula `td`
 */
function createTd(tableRow, content) {
	const td = document.createElement("td");
	td.classList.add("table__data");
	td.innerHTML = content;
	tableRow.appendChild(td);
}

/**
 * Cria uma linha da tabela (`tr`) preenchida com as informações de treinamento passadas por parâmetro. Tanto a `tr`
 * quanto cada `td` já possuem as classes de estilização utilizadas pelo sistema.
 *
 * @param {HTMLTableSectionElement} tableBody O corpo da tabela onde a linha criada deve ser inserida
 * @param {NeuralNetworkData} data O conteúdo a ser inserido na `tr`
 */
function createTrainTr(tableBody, data) {
	const tr = document.createElement("tr");
	tr.classList.add("table__row");

	const { input, output } = data;
	const inputKeys = Object.keys(input);

	for (const key of inputKeys) {
		createTd(tr, input[key]);
	}

	// última coluna: output
	const outputContent = JSON.stringify(output)
		.replace(/[\[\]{}"]/g, "")
		.replace(/,/g, ", ")
		.replace(/:/g, ": ");
	createTd(tr, outputContent);

	tableBody.appendChild(tr);
}

/**
 * Cria uma linha da tabela (`tr`) preenchida com as informações de classificação passadas por parâmetro. Tanto a `tr`
 * quanto cada `td` já possuem as classes de estilização utilizadas pelo sistema.
 *
 * @param {HTMLTableSectionElement} tableBody O corpo da tabela onde a linha criada deve ser inserida
 * @param {NeuralNetworkData} data O conteúdo a ser inserido na `tr`, sendo o campo `output` o resultado esperado
 * @param {Number} result O resultado devolvido pela rede neural para os dados de entrada em `data.input`
 */
function createClassificationTr(tableBody, data, result) {
	const tr = document.createElement("tr");
	tr.classList.add("table__row");

	const { input, output } = data;
	const inputKeys = Object.keys(input);

	for (const key of inputKeys) {
		createTd(tr, input[key]);
	}

	// coluna 'esperado'
	createTd(tr, output[0]);

	// coluna 'atual'
	createTd(tr, result);

	const resultStyleClass =
		result == output ? "table__row--assertion" : "table__row--error";
	tr.classList.add(resultStyleClass);

	tableBody.appendChild(tr);
}

export { fillInputOutputTable, fillClassificationTable, fillRate };
