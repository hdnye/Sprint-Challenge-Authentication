const request = require('supertest')
const server = require('../api/server')
const Auth = require('../auth/auth-model')
const db = require('../database/dbConfig')


// beforeEach(async () => {
//     await db.seed.run
// })

// afterEach(async () => {
//     await db.destroy()
// })

describe('User can login or register', () => {
    it('GETS users', async () => {
        const res = await request(server).get('/api/auth')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
    })
    it('registers a new user', async () => {
        const res = await request(server).get('/api/auth')
        await Auth.insert({ username: 'Lil Kim', password: 'abc123'})
        await Auth.insert({ username: 'Missy Elliot', password: 'def456'})
        //read data from table
        const user = await db('users')
        //verify 2 new records inserted
        expect(res.statusCode).toBe(200)
        expect(user).toBeInTheDocument()
    })
})