from sklearn.naive_bayes import MultinomialNB 

# 1º parâmetro: gordo 
# 2º parâmetro: perna curta
# 3º parâmetro: faz au au

porco1    = [1,1,0]
porco2    = [1,1,0]
porco3    = [1,1,0]

cachorro1 = [1,1,1]
cachorro2 = [0,1,1]
cachorro3 = [0,0,1]

dados = [porco1,porco2,porco3,cachorro1,cachorro2,cachorro3]
marcacoes = [1,1,1,-1,-1,-1]

modelo = MultinomialNB()
modelo.fit(dados,marcacoes)

misterioso1 = [1,1,1]
misterioso2 = [1,1,0]
misterioso3 = [0,0,0]

teste = [misterioso1,misterioso2,misterioso3]
marcacao_teste = [-1,1,-1]

resultado = modelo.predict(teste)
print("resultado: " , resultado)

diferenca = resultado - marcacao_teste
print("diferença: " , diferenca)

acertos = [d for d in diferenca if d == 0]
total_acertos = len(acertos)
print("total de acertos: " ,total_acertos)

total_elementos = len(teste)
print("total de elementos: " ,total_elementos)

taxa_acertos = 100 * total_acertos / total_elementos
print("taxa_acertos: ",taxa_acertos,"%")
