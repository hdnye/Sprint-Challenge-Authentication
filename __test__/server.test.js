const server = require('../api/server')
const request = require('supertest')

describe('server.js working', () => {
    it('shld rtn OK status from index rte', async () => {
        const expectedStatusCode = 200;
        const res = await request(server).get('/')
        expect(res.status).toEqual(expectedStatusCode)
    })
    it('should rtn JSON{}', async () => {
        const expectedBody = { message: 'Welcome to my API'}
        const res = await request(server).get('/')
        expect(res.body).toEqual(expectedBody)
    })
    it('should return content-type', async () => {
        const res = await request(server).get('/')
        expect(res.type).toEqual('application/json')
    })
})