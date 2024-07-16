import csv

def carregar_cursos():
	dados = []
	marcacoes = []
	
	arquivo = open('cursos.csv', 'r', encoding='utf-8')
	leitor = csv.reader(arquivo, delimiter=',')
	next(leitor)
	
	for home, busca, logado, comprou in leitor:
		dados.append([int(home), busca, int(logado)])
		marcacoes.append(int(comprou))
			
	return dados, marcacoes
