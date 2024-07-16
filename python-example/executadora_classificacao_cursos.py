import pandas as pd
from sklearn.naive_bayes import MultinomialNB

#exemplo de variáveis categóricas ==> dummies

df = pd.read_csv('cursos.csv')
dados_df = df[['home', 'busca', 'logado']] # x
marcacao_df = df['comprou']                # y

dados_dummies_df = pd.get_dummies(dados_df)
marcacao_dummies_df = marcacao_df

dados = dados_dummies_df.values
marcacao = marcacao_dummies_df.values

#eficiência do algoritmo que chuta 0 ou 1
acerto_zero = len(marcacao[marcacao == 0])
acerto_um = len(marcacao[marcacao == 1])

taxa_acerto_base = 100 * max(acerto_um, acerto_zero) / len(marcacao)
print("taxa de acerto base: %f"% taxa_acerto_base," %")

porcentagem_treino = 0.5
tamanho_treino = int(porcentagem_treino * len(marcacao))

treino_dados = dados[:tamanho_treino]
treino_marcacao = marcacao[:tamanho_treino]

tamanho_teste = len(marcacao) - tamanho_treino

teste_dados = dados[-tamanho_teste:]
teste_marcacao = marcacao[-tamanho_teste:]

modelo = MultinomialNB()
modelo.fit(treino_dados, treino_marcacao)
resultado = modelo.predict(teste_dados)

diferenca = resultado - teste_marcacao
print("diferença: ", diferenca)

acertos = [d for d in diferenca if d == 0]
total_acertos = len(acertos)
print("total de acertos: ", total_acertos)

total_elementos = len(teste_dados)
print("total de elementos: ", total_elementos)

taxa_acertos = 100 * total_acertos / total_elementos
print("taxa_acertos: ",taxa_acertos,"%")
