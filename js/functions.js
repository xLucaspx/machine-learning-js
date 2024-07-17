import "./types.js";

/**
 * Recebe o caminho do arquivo, realiza um fetch e retorna a função `.text()` da resposta
 *
 * @async
 * @param {String} filePath - O caminho do arquivo.
 * @returns {Promise<String>}
 */
async function getFileAsText(filePath) {
	const file = await fetch(filePath);
	const text = await file.text();

	return text;
}

/**
 * Recebe o caminho do arquivo, realiza um fetch e retorna a função `.blob()` da resposta
 *
 * @async
 * @param {String} filePath - O caminho do arquivo.
 * @returns {Promise<Blob>}
 */
async function getFileAsBlob(filePath) {
	const file = await fetch(filePath);
	const blob = await file.blob();

	return blob;
}

/**
 * Transforma o texto de um arquivo _.csv_ em um array; faz um `.split()` utilizando o separador passado como parâmetro.
 * Retorna um objeto contendo o **cabeçalho** (primeira linha) e os **dados** (linhas restantes) do arquivo.
 *
 * @param {String} file - O texto do arquivo _.csv_ que será convertido para array.
 * @param {String} [separator=","] - O separador do arquivo _.csv_; o padrão é `,`.
 * @param {String} [eol="\r\n"] - O caracter que determina a quebra de linha; o padrão é `\r\n`.
 * @returns {CSV}
 */
function getCsvAsArray(file, separator = ",", eol = "\r\n") {
	const arr = file.split(eol);

	const header = arr.shift().split(separator); // primeira linha
	const data = [];

	for (const line of arr) {
		data.push(line.split(separator));
	}

	return { header, data };
}

// /**
//  * Lê um objeto do tipo `File` ou `Blob` que representa um arquivo _.csv_ e, utilizando o separador passado como parâmetro, faz um `.split()`.
//  * Retorna um objeto contendo o **cabeçalho** (primeira linha) e os **dados** (linhas restantes) do arquivo.
//  *
//  * @param {Blob|File} file - O arquivo _.csv_ que será convertido para array.
//  * @param {String} [separator=","] - O separador do arquivo _.csv_; o padrão é `,`.
//  * @param {String} [eol="\r\n"] - O caracter que determina a quebra de linha; o padrão é `\r\n`.
//  * @returns {CSV}
//  */
// async function getCsvAsArray(file, separator = ",", eol = "\r\n") {
// 	const reader = new FileReader();
// 	reader.readAsText(file);

// 	const csv = {};

// 	reader.onloadend = async () => {
// 		const res = reader.result;
// 		const arr = res.split(eol);

// 		csv.header = arr.shift().split(separator); // primeira linha
// 		const data = [];

// 		for (const line of arr) {
// 			data.push(line.split(separator));
// 		}

// 		csv.data = data;
// 	};
// }

/**
 * Função para gerar dados no formato utilizado pela rede neural. Recebe um objeto que representa um arquivo _.csv_, com `header`
 * contendo os campos do arquivo e uma matriz de `inputs` na qual cada linha representa uma linha do arquivo, de acordo com o cabeçalho.
 *
 * **O último item do header será considerado como `output`**.
 *
 * @param {CSV} csv - Objeto que representa um arquivo _.csv_, contendo header e inputs.
 * @returns {NeuralNetworkData[]}
 */
function getNeuralNetworkData(csv) {
	const trainData = [];
	const { header, data } = csv;
	const outputPosition = header.length - 1; // o último valor é o output

	for (let line of data) {
		const input = {};
		// pegando último valor de cada linha como input e garantindo que seja numérico
		const output = [Number(line[outputPosition])];

		for (let i = 0; i < outputPosition; i++) {
			// preenche o objeto input com o nome do campo e seu valor, garantindo que o valor seja numérico
			input[header[i]] = Number(line[i]);
		}

		trainData.push({ input, output });
	}

	return trainData;
}

export { getFileAsText, getFileAsBlob, getCsvAsArray, getNeuralNetworkData };
