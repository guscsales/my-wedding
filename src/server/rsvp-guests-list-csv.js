const firebase = require('firebase-admin');
const googleAuth = require('./google-auth.json');
const json2xls = require('json2xls');
const fs = require('fs');

const WEDDING_HOUR = '05/06 às 15:00';

async function createGuestsCsv() {
	firebase.initializeApp({
		credential: firebase.credential.cert(googleAuth)
	});

	const guests = [];
	const guestConfirmationLinks = [];
	const db = firebase.firestore();
	const querySnapshot = await db.collection('families').get();

	querySnapshot.forEach(doc => {
		const { names, confirmed } = doc.data();
		const textConfirm = confirmed ? 'Sim' : 'Não';

		names.forEach(name => {
			guests.push({
				'Nome Completo': name,
				'Presença Confirmada': textConfirm
			});
		});

		if (!confirmed) {
			const firstNames = names.map(name => name.split(' ')[0]);
			const lastName = firstNames.pop();
			const result =
				firstNames.join(', ') + (firstNames.length > 0 ? ' e ' : '') + lastName;

			guestConfirmationLinks.push({
				'Nomes Completos': names.join(', '),
				'Mensagem WhatsApp': `Olá ${result}! Aqui é a Helena e o Gustavo, estamos enviando essa mensagem para informar que devido a pandemia do coronavírus o horário do nosso casamento foi alterado. 
				
*O novo horário será ${WEDDING_HOUR}.* 
				
Não deixe de confirmar sua presença no site clicando nesse link: https://gustavoehelena.com.br/?guest=${doc.id}
				
Nos vemos lá! :D`
			});
		}
	});

	fs.writeFileSync('Lista de Convidados.xlsx', json2xls(guests), 'binary');
	fs.writeFileSync(
		'Lista de Famílias Que Ainda Não Confirmaram.xlsx',
		json2xls(guestConfirmationLinks),
		'binary'
	);
}

createGuestsCsv();
