import csv

def carregar_acessos():
	dados = []
	marcacoes = []

	arquivo = open('acesso.csv','r', encoding='utf-8')
	leitor = csv.reader(arquivo,delimiter=',')
	next(leitor)

	for home,como_funciona,contato,comprou in leitor:
		dados.append([int(home),int(como_funciona),int(contato)])
		marcacoes.append(int(comprou))
	
	return dados, marcacoes
