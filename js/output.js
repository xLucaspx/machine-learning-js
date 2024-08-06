import "./types.js";

/**
 * Preenche a tabela que possui o ID informado no HTML com os dados de treinamento passados por parâmetro
 *
 * @param {String} tableId O ID da tabela que deve ser preenchida no HTML
 * @param {NeuralNetworkData[]} data Objeto contendo as informações no formato consumido pela rede neural, sendo
 * um objeto `input` com os campos
 * de entrada e um campo `output`, que pode ser um objeto ou um _array_ contendo a saída.
 */
export function fillTrainTable(tableId, data) {
	const table = document.getElementById(tableId);
	const tableHeaderRow = table.querySelector("thead>tr");
	const tableBody = table.querySelector("tbody");

	const headerFields = [...Object.keys(data[0].input), "output"];
	createTableHeader(tableHeaderRow, headerFields);

	// populando tabela com dados
	data.forEach((d) => {
		createTr(tableBody, d);
	});

	tableHeaderRow.scrollIntoView();
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
 * Cria uma linha da tabela (`tr`) preenchida com as informações passadas por parâmetro. Tanto a `tr`
 * quanto cada `td` já possuem as classes de estilização utilizadas pelo sistema.
 *
 * @param {HTMLTableSectionElement} tableBody O corpo da tabela onde a linha criada deve ser inserida
 * @param {NeuralNetworkData} data O conteúdo a ser inserido na `tr`
 */
function createTr(tableBody, data) {
	const tr = document.createElement("tr");
	tr.classList.add("table__row");

	const { input, output } = data;
	const inputKeys = Object.keys(input);

	for (const key of inputKeys) {
		createTd(tr, input[key]);
	}

	// última coluna: output
	const outputContent = JSON.stringify(data.output).replace(/[\[\]{}"]/g, "");
	createTd(tr, outputContent);

	tableBody.appendChild(tr);
}
