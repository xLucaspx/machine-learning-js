# Atividade

Utilizando uma base de dados (e.g. arquivo csv), pegar últimas 10 linhas como dados verdadeiros e verificar quantos % das linhas acima contém dados verdadeiros (machine learning).

## Requisitos não funcionais

- [x] A linguagem de programação utilizada deverá ser _JavaScript_;

## Machine Learning

**Aprendimento supervisionado** (_supervised machine learning_) usa um set de variáveis como input para prever o valor de saída. Utiliza dados rotulados (dados com respostas conhecidas) para treinar algoritmos para classificar dados e prever resultados.
Pode, por exemplo, classificar dados como "o que é spam em uma caixa de e-mail" baseado em exemplos conhecidos de spam; pode também prever o tipo de vídeos que um usuário gosta mais com base nos vídeos assistidos previamente.

## Sobre a atividade

Foram fornecidos, pelo professor, exemplos de código de _machine learning_ em _Python_. Primeiramente, converteu-se estes códigos para JavaScript,  utilizando a biblioteca [Brain.js](https://github.com/BrainJS/brain.js), e realizou-se testes de **aproximação** e **classificação (asserção)**.

Após, foram criadas funções para buscar um arquivo _csv_ do computador e transformá-lo no tipo de dado que é consumido pela rede neural, realizando o treinamento com as últimas 10 linhas e testando as linhas restantes. Todas as funções e tipos de dados criados estão documentados utilizando [_JSDoc_](https://jsdoc.app/), o que facilita o desenvolvimento e entendimento do código.

O HTML contém explicações sobre a atividade e é preenchido com os dados utilizados para teste e treinamento. Foi criada uma paleta de cores para melhorar a apresentação do projeto:

![Cores de fonte e fundo](./docs/font-bg.jpg)
_Cores de fonte e fundo_

![Paleta de cores](./docs/colours.jpg)
_Paleta de cores_

## Rodando o projeto

Para que o _JavaScript_ do projeto funcione, é necessário subir o mesmo em um servidor. Uma ótima opção é utilizar a extensão [_Live Server_](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do _VS Code_; basta instalar e aparecerá, no canto inferior esquerdo, um botão **Go Live** que, ao ser clicado, subirá o projeto na porta `5500` por padrão.

Também é possível utilizar um servidor PHP para subir o projeto.
