const db = require('../database/dbConfig')
const bcrypt = require('bcryptjs')

module.exports = {
    find,
    findById,
    insert,
}

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first()
}
async function insert(user) {
    user.password = await bcrypt.hash(user.password, 13)
    const [id] = await db('users').insert(user)
    return findById(id)
}
