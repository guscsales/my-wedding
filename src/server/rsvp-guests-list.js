const firebase = require('firebase-admin');
const googleAuth = require('./google-auth.json');

const guests = [
	{
		names: ['Djalma de Souza Santos', 'Marizete Sales Santos']
	},
	{
		names: ['Marlene Campos Sousa', 'Amanda Campos Lourenço']
	},
	{
		names: [
			'Rita de Cássia Campos Cavalcante',
			'Vilmar Ferreira de Oliveira',
			'Beatriz Ferroli Cavalcante',
			'Gustavo Invernise Moraes',
			'Gabriel Ferroli Cavalcante'
		]
	},
	{
		names: ['Maria Helena Sousa']
	},
	{
		names: ['José Aparecido Rufino', 'Marta Souza', 'Anna Luísa']
	},
	{
		names: [
			'Kelly Franco dos Santos',
			'Heuler Rodrigues de Moura',
			'Cristian Moura',
			'Klooe Moura'
		]
	},
	{
		names: ['Éder Costa Bezerra']
	},
	{
		names: ['Alcina Brito das Chagas']
	},
	{
		names: ['Maria Luiza Brito das Chagas']
	},
	{
		names: [
			'Belchior Bezerra Costa',
			'Ana Alves Bezerra',
			'Elnamara Costa Bezerra'
		]
	},
	{
		names: ['Lucas Costa Soares', 'Camila Crispim dos Santos Soares']
	},
	{
		names: [
			'Elana Costa Ramiro',
			'Alexandre Ramiro Pinto',
			'Mateus Costa Ramiro',
			'Eloise Costa Ramiro'
		]
	},
	{
		names: ['Malvina Ramiro Pinto', 'Benedicto Pinto']
	},
	{
		names: [
			'Sônia Helena Bezerra de Assis Republicano',
			'Carlos Eduardo de Assis Republicano',
			'Nathalia Bezerra de Assis Republicano'
		]
	},
	{
		names: [
			'Sahanne Sthefane Silvestre Silva Republicano',
			'Felipe Bezerra de Assis Republicano',
			'Helena Silvestre Republicano',
			'Joaquim Silvestre Republicano'
		]
	},
	{
		names: ['Marinalva Günther']
	},
	{
		names: ['Amanda Valva Farias']
	},
	{
		names: ['Nayara dos Santos Matias']
	},
	{
		names: [
			'Maria Nazir Gonzaga de Medeiros',
			'Jânio Bezerra de Medeiros Sales'
		]
	},
	{
		names: ['Márcia Tedesco']
	},
	{
		names: [
			'Ildeni Candido dos Santos Andrade',
			'Filipe santos Andrade',
			'Raimundo Filho de Andrade'
		]
	},
	{
		names: [
			'Vilany Vieira de Farias da Silva',
			'Cicero Bento da Silva',
			'Vitória Vieira da Silva',
			'Silas Marinho da Silva',
			'Maria Isabelle Vieira da Silva'
		]
	},
	{
		names: ['Mariana Gomes de Melo', 'Guilherme Galesso Lunardi']
	},
	{
		names: ['Adejair Vidal dos Santos Junior']
	},
	{
		names: [
			'Platini Alves Pereira',
			'Aline Aparecida Lessa',
			'Pedro Henrique pimenta Almeida'
		]
	},
	{
		names: ['Thais Stirbolow de Britos', 'Fernando Ferreira de Brito']
	},
	{
		names: [
			'Danielle Rodrigues Gomes de Oliveira',
			'Gael Rodrigues Gomes de Oliveira'
		]
	},
	{
		names: [
			'Mavy alves Cavalcanti',
			'Cássio de Almeida Cavalcanti',
			'Aiyra Alves cavalcanti'
		]
	},
	{
		names: [
			'Victoria de Menezes Halsman',
			'Maria Beatriz de Menezes Halsman',
			'Léo Isaac Roveri Halsman'
		]
	},
	{
		names: [
			'Julio Cesar Souza Sales',
			'Letícia Narques da Silva Sales',
			'Barbara Marques Silva Sales'
		]
	},
	{
		names: ['Matheus Marques Silva Sales', 'Stephanie Ferreira Furtado']
	},
	{
		names: ['Fabio Sales da Freiria', 'Tatiane Cristina Silva da Freiria']
	},
	{
		names: ['Ricardo Batista da Freiria', 'Marlene Sales da Freiria']
	},
	{
		names: [
			'Américo Francisco de Souza Neto',
			'Andreia de Paula Tedim Souza',
			'Dalette Tedim Souza',
			'Olivia Tedim Souza'
		]
	},
	{
		names: [
			'João Souza Sales',
			'Marcia Ruiz Zabinato Sales',
			'Fernanda Zabinato Sales'
		]
	},
	{
		names: ['Zilda Madalena Sales', 'Marina Souza Sales']
	},
	{
		names: [
			'João Pinto de Moraes',
			'Aline Zabonato de Moraes',
			'Heitor Zabonado de Moraes ',
			'Sofia Zabonato de Moraes'
		]
	},
	{
		names: [
			'Luiz Cláudio da Silva',
			'Maria Neide Sales da Silva',
			'Fernando Soares Sales'
		]
	},
	{
		names: [
			'Daniel G. Basile',
			'Daniele Zabonato Sales',
			'Gabriela Zabonato G. Basile'
		]
	},
	{
		names: [
			'Dioner César França Santos',
			'Luci Rodrigues Barbosa Santos',
			'Emily Vitória Barbosa Santos',
			'Bruna Kristin Barbosa Santos',
			'Heitor Santos Oliveira'
		]
	},
	{
		names: [
			'Donaldo França Santos',
			'Karen Rosa Santana Santos',
			'Amanda Santana Santos'
		]
	},
	{
		names: [
			'Sueli França Santos Uchoa',
			'Deusimar Uchoa',
			'Duilor França Santos Uchoa'
		]
	},
	{
		names: ['Adiael da Silva', 'Duane Uchoa da Silva']
	},
	{
		names: ['Denis França Santos Uchoa', 'Alessandra Sales Uchoa']
	},
	{
		names: [
			'Duran França Santos Uchoa',
			'Tatiane Aparecida Ribeiro Uchoa',
			'Alycia Ribeiro Uchoa',
			'Théo Ribeiro Ucoa'
		]
	},
	{
		names: ['Cesar de Souza Santos', 'Josefa Santos']
	},
	{
		names: [
			'Helio Nascimento Santos',
			'Celi França Santos',
			'Vitor França Santos',
			'Henrique França Santos',
			'Celine França Santos'
		]
	},
	{
		names: [
			'Roselene França Santos',
			'Edgar Reis',
			'Gabriele Ferreira da Silva',
			'Juliane Ferreira Santos'
		]
	},
	{
		names: [
			'Alexsandra Souza',
			'Luis Fernando de Carvalho',
			'Marinalva Souza',
			'Marcelo Freitas',
			'Simone Maciel'
		]
	},
	{
		names: ['André Brito Santana', 'July Baptista de Castro Pereira']
	},
	{
		names: [
			'Lenivaldo Teodoro de Souza',
			'Valéria de Souza Nunes Teodoro',
			'João Victor Nunes Teodoro',
			'Ana Luiza Nunes Teodoro'
		]
	},
	{
		names: ['Vicente José de Lima Neto', 'Viviane Paiva de Lima']
	},
	{
		names: [
			'José Tosta',
			'Francisca Liduína Rodrigues Tosta',
			'Felipe Rodrigues Tosta'
		]
	},
	{
		names: ['Epaminondas José Cristóvão de Souza', 'Maria Conceição Cruz Souza']
	},
	{
		names: [
			'Rosemberg Rangel',
			'Cláudia de Oliveira Rangel',
			'Sofia de Oliveira Ragel'
		]
	},
	{
		names: [
			'Wedros de Araújo Dias',
			'Adriana de Souza Nunes Dias',
			'Isabela Nunes Dias'
		]
	},
	{
		names: [
			'Márcio Alexandre Moura',
			'Magnólia Ribeiro Santos Moura',
			'Maitê Ribeiro Moura'
		]
	},
	{
		names: [
			'Milton Souza Santos',
			'Regina Correia da Hora Santos',
			'Sara Correia Santos',
			'Natã Correia Santos'
		]
	},
	{
		names: [
			'Eliezer Victor Pereira Ramos',
			'Fernanda Tudela Ramos',
			'Laura Ramos',
			'Luiza Ramos',
			'Leticia Ramos'
		]
	},
	{
		names: [
			'Rodrigo Barboza de Oliveira',
			'Claudia Regina Lima de Oliveira',
			'Felipe Schwartz de Oliveira',
			'Rafaela Schwartz de Oliveira'
		]
	},
	{
		names: ['Paulo Queiroz', 'Renata Fontes Farias Queiroz', 'Nicolas Queiroz']
	},
	{
		names: ['Matteus Corti Silva']
	},
	{
		names: ['Lucas Ribeiro Brambilla', 'Gabriel Brambila']
	},
	{
		names: ['Emerson Demerara', 'Amanda Parreira']
	},
	{
		names: ['Karinna Grillo Domingos', 'Nathalia Grillo Domingos']
	},
	{
		names: [
			'Julia de Souza Ferreira',
			'Marcel Augusto',
			'Beatriz de Souza Ferreira',
			'Guilherme de Souza Ferreira'
		]
	},
	{
		names: ['Matheus Sued Mota e Silva', "Pamela D'Avanzo"]
	},
	{
		names: ['Rodrigo Salgado']
	},
	{
		names: ['Felipe Pinheiro de Sá']
	},
	{
		names: ['Mateus Del Duque de Paula Honório', 'Guilherme Sousa']
	},
	{
		names: [
			'Rafael Alvares Martins de Castro',
			'Renata Alvares Martins de Castro',
			'Clara Alvares Martins de Castro'
		]
	},
	{
		names: [
			'Davi Bastos',
			'Selma Borges Bastos',
			'Stella Bastos',
			'Nickolas Prates'
		]
	},
	{
		names: ['Luan Vieira Pereira', 'Michelle Ferreira']
	},
	{
		names: ['Wesley Rosa', 'Bruno Rocha']
	},
	{
		names: ['Maria Fernanda M. Alves', 'Kaique Quilles Gomes']
	},
	{
		names: ['Olivia Lacerda']
	},
	{
		names: ['Priscila Nespolli Coelho', 'Luiz Dona Jr.']
	},
	{
		names: ['Matheus Filipe Valverde Berber', 'Tayane Valverde Berber']
	},
	{
		names: ['Luiz Fernando Ferreira Berber']
	},
	{
		names: ['Maria Eduarda Gouveia Alves da Costa']
	},
	{
		names: ['Gustavo Athié', 'Stella Athié']
	},
	{
		names: [
			'Paulo Silas de Carvalho',
			'Juliana Viudes Machado de Carvalho',
			'Thalia Viudes de Carvalho'
		]
	},
	{
		names: ['Gilcson dos Santos Dias', 'Fernanda Silva Barros Dias']
	},
	{
		names: [
			'Luciene Maria do Nascimento Marques',
			'Natalya Nascimento Marques',
			'Thiago Gomes Sertão Vieira'
		]
	},
	{
		names: ['Alexandre Costa', 'Débora Costa', 'Amanda Costa', 'Arthur Costa']
	},
	{
		names: ['Pedro Vinícius Cruz de Souza', 'Jenifer Greice Cagliari Souza']
	},
	{
		names: [
			'Rafael Carvalho Nunes',
			'Elaine Ribeiro Santos Nunes',
			'Samuel Santos Carvalho Nunes',
			'Raphaela Silva dos Santos Lopes'
		]
	},
	{
		names: ['Elvis Silva', 'Rosana Silva']
	},
	{
		names: [
			'Fernando José da Silva',
			'Enicleide Ribeiro Santos da Silva',
			'Davi Santos Silva',
			'Felipe Santos Silva',
			'Pedro Santos Silva',
			'Eva Santos Silva'
		]
	},
];

function normalizeName(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[áàãâä]/g, 'a')
		.replace(/[éèêë]/g, 'e')
		.replace(/[íìîï]/g, 'i')
		.replace(/[óòõôö]/g, 'o')
		.replace(/[úùûü]/g, 'u')
		.replace(/[ç]/g, 'c')
		.replace(/_+/, '_');
}

function createGuests() {
	firebase.initializeApp({
		credential: firebase.credential.cert(googleAuth)
	});

	const db = firebase.firestore();

	guests.forEach(guest => {
		const normalizedNames = guest.names.map(name => normalizeName(name));

		db.collection('families').add({
			...guest,
			confirmed: false,
			normalizedNames
		});
	});
}

createGuests();
