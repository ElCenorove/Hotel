// Arquivo para gerenciamento de autenticação (auth.js)
let authenticatedUsers = {};

module.exports = {
    isAuthenticated: (userId) => {
        return !!authenticatedUsers[userId];
    },
    authenticateUser: (userId, userData) => {
        authenticatedUsers[userId] = userData;
    },
    logoutUser: (userId) => {
        delete authenticatedUsers[userId];
    },
    getUser: (userId) => {
        return authenticatedUsers[userId];
    }
};
