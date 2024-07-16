from classificacao_acesso import carregar_acessos
from sklearn.naive_bayes import MultinomialNB

dados, marcacao = carregar_acessos()
#print(dados)
#print(marcacao)

treino_dados = dados[:90]
treino_marcacao = marcacao[:90] 
teste_dados = dados[-9:]
teste_marcacao = marcacao[-9:] 

modelo = MultinomialNB()
#modelo.fit(dados, marcacao)
modelo.fit(treino_dados, treino_marcacao)

#resultado = modelo.predict(dados)
resultado = modelo.predict(teste_dados)

#diferenca = resultado - marcacao
diferenca = resultado - teste_marcacao
print("diferença: ", diferenca)

acertos = [d for d in diferenca if d == 0]

total_acertos = len(acertos)
print("total de acertos: ", total_acertos)

#total_elementos = len(dados)
total_elementos = len(teste_dados)
print("total de elementos: ", total_elementos)

taxa_acertos = 100 * total_acertos / total_elementos
print("taxa_acertos: ", taxa_acertos, "%")
