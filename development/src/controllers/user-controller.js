import requester from '../utils/requester';
import notificator from '../utils/notificator';

function login(userData) {
    return requester.post('user', 'login', 'basic', userData);
}

function register(userData) {
    return requester.post('user', '', 'basic', userData);
}

function logout() {
    return requester.post('user', '_logout', 'kinvey');
}

function getUserById(userId) {
    return requester.get('user', userId, 'kinvey');
}

function updateUser(newData) {
    return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', newData);
}

function isValidInput(authType, userData) {
    switch (authType) {
        case 'login':
            if (userData.username.length < 4) {
                notificator.showError('Username must be at least 4 symbols!');
                return false;
            } else if (userData.password.length < 5) {
                notificator.showError('Password must be at least 5 symbols!');
                return false;
            }
            return true;
        case 'register':
            if (!(/^[A-Za-z0-9]{4,}$/.test(userData.username))) {
                notificator.showError('Username must be at least 4 characters long and contain symbols [a-z][A-Z][0-9]!');
                return false;
            } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(userData.email)) {
                notificator.showError('Please provide valid Email address!');
                return false;
            } else if (!(/^[A-Za-z\d]{5,}$/.test(userData.password))) {
                notificator.showError('Password must be at least 5 characters long and contain symbols [a-z][A-Z][0-9]!');
                return false;
            } else if (userData.password !== userData.repeatPassword) {
                notificator.showError('Passwords mismatch!');
                return false;
            }
            return true;
        default:
            notificator.showError("Something went while validating your data!");
            return false;
    }
}

function saveSession(response) {
    sessionStorage.setItem('username', response.username);
    sessionStorage.setItem('authtoken', response._kmd.authtoken);
    sessionStorage.setItem('userId', response._id);
    if (response._kmd.roles !== undefined) {
        sessionStorage.setItem('roleId', response._kmd.roles[0].roleId);
    }
}

export default {
    login,
    register,
    logout,
    getUserById,
    updateUser,
    isValidInput,
    saveSession
}