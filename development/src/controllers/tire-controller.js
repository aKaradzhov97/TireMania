import requester from '../utils/requester';
import notificator from '../utils/notificator';
import Tire from '../models/Tire';

function createTire(data) {
    return requester.post('appdata', 'tires', 'kinvey',
        new Tire(data.brand, data.model, data.width, data.height, data.diameter, data.season, data.weightIndex, data.speedIndex, data.price, data.picName));
}

function getAllTires() {
    return requester.get('appdata', 'tires', 'kinvey');
}

function editTire(id, data) {
    return requester.update('appdata', `tires/${id}`, 'kinvey',
        new Tire(data.brand, data.model, data.width, data.height, data.diameter, data.season, data.weightIndex, data.speedIndex, data.price, data.picName));
}

function deleteTire(id) {
    return requester.remove('appdata', `tires/${id}`, 'kinvey');
}

function getTireById(id) {
    return requester.get('appdata', `tires/${id}`, 'kinvey');
}

function isValidInput(tire) {
    if (tire.brand === '') {
        notificator.showError('Please fill brand input area!');
        return false;
    } else if (tire.model === '') {
        notificator.showError('Please fill model input area!');
        return false;
    } else if (tire.width === '') {
        notificator.showError('Please fill width input area!');
        return false;
    } else if (tire.height === '') {
        notificator.showError('Please fill height input area!');
        return false;
    } else if (tire.diameter === '') {
        notificator.showError('Please fill diameter input area!');
        return false;
    } else if (tire.season === '') {
        notificator.showError('Please fill season input area!');
        return false;
    } else if (tire.weightIndex === '') {
        notificator.showError('Please fill weight index input area!');
        return false;
    } else if (tire.speedIndex === '') {
        notificator.showError('Please fill speed index input area!');
        return false;
    } else if (tire.price === '') {
        notificator.showError('Please fill price input area!');
        return false;
    } else if (tire.picName === '') {
        notificator.showError('Please fill image URL input area!');
        return false;
    }
    return true;
}

export default {
    createTire,
    getAllTires,
    editTire,
    deleteTire,
    getTireById,
    isValidInput
}