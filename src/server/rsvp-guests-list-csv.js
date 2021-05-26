const firebase = require('firebase-admin');
const googleAuth = require('./google-auth.json');
const json2xls = require('json2xls');
const fs = require('fs');
const _ = require('lodash');

const WEDDING_HOUR = '15:00';

async function createGuestsCsv() {
	firebase.initializeApp({
		credential: firebase.credential.cert(googleAuth)
	});

	let guests = [];
	const guestConfirmationLinks = [];
	const db = firebase.firestore();
	const querySnapshot = await db.collection('families').get();

	querySnapshot.forEach(doc => {
		const { names, confirmed } = doc.data();
		const textConfirm = confirmed ? 'Sim' : 'Não';

		names.forEach(name => {
			guests.push({
				Letra: '',
				'Nome Completo': name,
				'Presença Confirmada': textConfirm
			});
		});

		guests = _.orderBy(guests, ['Nome Completo'], ['asc']);

		guests = guests.reduce((prev, cur) => {
			if (!prev['Nome Completo']) {
				guests.push({
					Letra: 'A'
				});
			} else if (
				cur['Nome Completo'].toLowerCase().charAt(0) !==
				prev['Nome Completo'].toLowerCase().charAt(0)
			) {
				guests.push({
					Letra: cur['Nome Completo'].toUpperCase().charAt(0)
				});
			}

			return cur;
		}, []);

		console.log(guests);

		const firstNames = names.map(name => name.split(' ')[0]);
		const lastName = firstNames.pop();
		const result =
			firstNames.join(', ') + (firstNames.length > 0 ? ' e ' : '') + lastName;

		guestConfirmationLinks.push({
			'Nomes Completos': names.join('\n'),
			'Mensagem WhatsApp': `❤️ *Vamos nos casar! Helena & Gustavo* ❤️

*05/06/2021 - 15H: Reserve essa data* 👇🏻

Olá ${result}! Nós estamos enviando essa mensagem para informar que devido a pandemia do COVID-19 o horário do nosso casamento foi alterado.

⚠️ *O NOVO HORÁRIO DA CERIMÔNIA É 15:00* ⚠️

*CERIMONIAL & RECEPÇÃO*
Evian Eventos: Rua Guaiaúna, 820 - Penha, São Paulo - SP (Próximo ao metro Penha)

A recepção será realizada no Salão San Peregrine.

Todos os protocolos de segurança relacionado ao COVID-19 serão seguidos. 

${
	!confirmed
		? `Confirme sua presença no site: https://gustavoehelena.com.br/?guest=${doc.id}`
		: ''
}`
		});
	});

	// fs.writeFileSync('Lista de Convidados.xlsx', json2xls(guests), 'binary');
	// fs.writeFileSync(
	// 	'Lista de Famílias Que Ainda Não Confirmaram.xlsx',
	// 	json2xls(guestConfirmationLinks),
	// 	'binary'
	// );
}

createGuestsCsv();
