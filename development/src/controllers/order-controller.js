import requester from '../utils/requester';

function createOrder(data) {
    return requester.post('appdata', 'orders', 'kinvey', data);
}

export default {
    createOrder
}