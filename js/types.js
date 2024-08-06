/**
 * @typedef {Object} CSV
 * Representa um arquivo _.csv_ contendo cabeçalho e demais dados.
 * `header` é um array contendo os valores da primeira linha do arquivo.
 * `data` é uma matriz na qual cada linha representa uma linha do arquivo e cada coluna um campo, conforme o cabeçalho.
 *
 * @property {String[]} header - Cabeçalho do arquivo _.csv_.
 * @property {String[][]} data - Dados do arquivo _.csv_.
 */

/**
 * @typedef {Object} NeuralNetworkData
 * Representa o formato de dados utilizado pela rede neural; consiste de duas chaves: `input` e `output`, sendo a primeira
 * um objeto que contém os campos e seus valores e a segunda um array contendo a saída (0 ou 1)
 *
 * @property {Object} input - Contém os campos de entrada e seus valores.
 * @property {Number[] | Object} output - Contém a saída correspondente à entrada (0 ou 1).
 */
