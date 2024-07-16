from classificacao_acesso import carregar_acessos
from sklearn.naive_bayes import MultinomialNB

dados, marcacao = carregar_acessos()

treino_dados = dados[-10:]
treino_marcacao = marcacao[-10:] 

teste_dados = dados[:89]
teste_marcacao = marcacao[:89]

modelo = MultinomialNB()
modelo.fit(treino_dados, treino_marcacao)

resultado = modelo.predict(teste_dados)
# resultado = modelo.predict(teste_dados)

diferenca = resultado - teste_marcacao
# diferenca = resultado - teste_marcacao
print("diferença: ", diferenca)

acertos = [d for d in diferenca if d == 0]

total_acertos = len(acertos)
print("total de acertos: ", total_acertos)

total_elementos = len(teste_dados)
# total_elementos = len(teste_dados)
print("total de elementos: ", total_elementos)

taxa_acertos = 100 * total_acertos / total_elementos
print("taxa_acertos: ", taxa_acertos, "%")
