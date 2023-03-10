const argon2 = require('argon2');
const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 2 ** 18,
        timeCost: 5,
        parallelism: 4,
        hashLength: 64,
        saltLength: 20,
    });
}

const verifyPassword = (hashedPassword, password) => {
    return argon2.verify(hashedPassword, password);
}

const formatDate = (date) => {
    return date.toISOString().split("T")[0];
}

module.exports = {
    hashPassword,
    verifyPassword,
    bcrypt,
    formatDate
}