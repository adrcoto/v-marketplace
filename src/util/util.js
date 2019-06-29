let message = '';
let date = '';
const months = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];

export function getMessage(response) {
    switch (response) {
        case 'name':
            message = 'Introduceți un nume';
            break;
        case 'name.max':
            message = 'Numele este prea lung';
            break;
        case 'email':
            message = 'Introduceți o adresă de e-mail';
            break;
        case 'email.email':
            message = 'Adresa de e-mail trebuie să fie validă';
            break;
        case 'email.unique':
            message = 'Există deja un utilizator asociat aceastei adrese de e-mail';
            break;
        case 'email.exists':
            message = 'Nu există nici un utilizator asociat acestei adrese de e-mail';
            break;
        case 'password':
            message = 'Introduceți o parolă';
            break;
        case 'password.min':
            message = 'Parola trebuie să conțină minim 6 caractere';
            break;
        case 'user.404':
            message = 'E-mail sau parola greșite';
            break;
        case 'user.activated':
            message = 'Contul este deja activat';
            break;
        case 'user.unactivated':
            message = 'Contul dumneavoastră incă nu este activat';
            break;
        case 'code':
            message = 'Cod inexistent';
            break;
        case 'code.min':
        case 'code.max':
            message = 'Codul nu este valid';
            break;
        case 'phone.min':
            message = 'Introduceți un număr de telefon valid';
            break;

        default:
            message = 'Verificați conexiunea la Internet';
            break;
    }

    return message;
}

export function getItemMessage(response) {
    switch (response) {
        case 'item.404':
            message = 'Anunțul nu a fost găsit';
            break;
        case 'title':
            message = 'Introduceți un titlu';
            break;
        case 'title.max':
            message = 'Titlul este prea lung';
            break;
        case 'description':
            message = 'Descrierea anunțului este obligatorie';
            break;
        case 'description.max':
            message = 'Descrierea este prea lungă';
            break;
        case 'price':
            message = 'Introduceți un preț';
            break;
        case 'price.min':
            message = 'Introduceți un preț valid';
            break;

        case 'currency':
            message = 'Alegeți una dintre cele doua monezi disponibile';
            break;

        case 'category':
            message = 'Alegeți o categorie';
            break;
        case 'category.exists':
            message = 'Categorie invalidă';
            break;

        case 'type.required':
            message = 'Alegeți un tip';
            break;

        case 'type.exists':
            message = 'Tip invalid';
            break;

        case 'location':
            message = 'Alegeți o locație';
            break;
        case 'item.delete.403':
            message = 'Nu aveți drepturile necesare pentru a șterge acest anunț';
            break;

        case 'favorite.already':
            message = 'Anunțul este deja in lista de anuțuri favorite';
            break;

        default:
            message = 'aa';
            break;
    }
    return message;
}


export function calculateDate(actual, actualDay, actualYear, created) {

    const createdYear = created.getFullYear();
    const createdMonth = created.getMonth() + 1;
    const createdDay = created.getDate();
    const createdHour = created.getHours();
    const createdMin = created.getMinutes();

    let date = '';

    if (actualDay - createdDay === 1)
        date = 'Ieri ' + createdHour + ':' + createdMin;
    else if (createdDay - actualDay === 0)
        date = 'Azi ' + createdHour + ':' + createdMin;
    else
        date = createdDay + ' ' + months[createdMonth - 1];

    if (createdYear !== actualYear)
        date = createdDay + ' ' + months[createdMonth - 1] + ' ' + createdYear;

    return date;
}

