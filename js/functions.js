/**
 * Recebe o caminho do arquivo, realiza um fetch e retorna a função `.text()` da resposta
 *
 * @async
 * @function getFileAsText
 * @param {String} filePath - O caminho do arquivo
 * @returns {String}
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
 * @function getFileAsBlob
 * @param {String} filePath - O caminho do arquivo
 * @returns {Blob}
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
 * @param {String} file - O texto do arquivo _.csv_ que será convertido para array
 * @param {String} [separator=","] - O separador do arquivo _.csv_; o padrão é `,`
 * @param {String} [eol="\r\n"] - O caracter que determina a quebra de linha; o padrão é `\r\n`
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
//  * @param {Blob|File} file - O arquivo _.csv_ que será convertido para array
//  * @param {String} [separator=","] - O separador do arquivo _.csv_; o padrão é `,`
//  * @param {String} [eol="\r\n"] - O caracter que determina a quebra de linha; o padrão é `\r\n`
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

export { getFileAsText, getFileAsBlob, getCsvAsArray };
