const request = require('supertest')
const server = require('../api/server')
const Auth = require('../auth/auth-model')
const db = require('../database/dbConfig')

describe('User can login or register', () => {
    it('GETS users', async () => {
        const res = await request(server).get('/api/auth')
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe('application/json')
    })
})