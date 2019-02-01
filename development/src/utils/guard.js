function isAuthenticated() {
    return (sessionStorage.getItem('username')
        && sessionStorage.getItem('authtoken')
        && sessionStorage.getItem("userId"));
}

function isAdmin() {
    return (sessionStorage.getItem('roleId')
        && sessionStorage.getItem('username')
        && sessionStorage.getItem('authtoken')
        && sessionStorage.getItem("userId"));
}

export default {
    isAuthenticated,
    isAdmin
}