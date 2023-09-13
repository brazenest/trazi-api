import crypto from 'crypto'
import supertest from 'supertest'
import app from '../src/app.mjs'

import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('Population API routes', () => {
    let server, randomString

    before(() => {
        server = app()
    })

    describe('GET request', async () => {

        describe('with valid request parameters (i.e. record should exist)', () => {

            describe('and properly-cased request parameters', () => {
                it('should return 200 response', async () => {
                    const response = await supertest(server)
                        .get('/api/population/state/Florida/city/Orlando')

                    expect(response.statusCode).to.equal(200)
                    expect(response.body).to.have.property('population')
                    expect(response.body.population).to.be.a('number')
                })
            })

            describe('and lowercased request parameters', () => {
                it('should return 200 response', async () => {
                    const response = await supertest(server)
                        .get('/api/population/state/florida/city/orlando')

                    expect(response.statusCode).to.equal(200)
                    expect(response.body).to.have.property('population')
                    expect(response.body.population).to.be.a('number')
                })
            })

            describe('and uppercased request parameters', () => {
                it('should return 200 response', async () => {
                    const response = await supertest(server)
                        .get('/api/population/state/FLORIDA/city/ORLANDO')

                    expect(response.statusCode).to.equal(200)
                    expect(response.body).to.have.property('population')
                    expect(response.body.population).to.be.a('number')
                })
            })

        })


        describe('an invalid request', () => {

            const expectedErrorMessage = {
                status: 'error',
                message: 'State / City combination cannot be found.',
            }
            

            beforeEach(() => {
                randomString = crypto.randomBytes(8).toString('hex')
            })

            describe('with invalid state parameter (i.e. state should not exist)', () => {
                it('should return 400 response and an error message in JSON', async () => {
                    const response = await supertest(server)
                        .get(`/api/population/state/${randomString}/city/Orlando`)

                    expect(response.statusCode).to.equal(400)
                    expect(response.body).to.deep.equal(expectedErrorMessage)
                })
            })

            describe('with invalid city parameter (i.e. city should not exist in specified state)', () => {
                it('should return 400 response and an error message in JSON', async () => {
                    const response = await supertest(server)
                        .get(`/api/population/state/Florida/city/${randomString}`)

                    expect(response.statusCode).to.equal(400)
                    expect(response.body).to.deep.equal(expectedErrorMessage)
                })
            })

            describe('with invalid state and city parameters (i.e. record should not exist)', () => {
                it('should return 400 response and an error message in JSON', async () => {
                    const response = await supertest(server)
                        .get(`/api/population/state/${randomString}/city/${randomString}`)

                    expect(response.statusCode).to.equal(400)
                    expect(response.body).to.deep.equal(expectedErrorMessage)
                })
            })
        })


    })

    describe('PUT request', () => {

        describe('with text/plain content-type', () => {

            describe('for request params that match a record', () => {
                it('should return 200 response', async () => {
                    const response = await supertest(server)
                        .put(`/api/population/state/Florida/city/Orlando`)
                        .set('Content-Type', 'text/plain')
                        .send("343584")
    
                    expect(response.statusCode).to.equal(200)
                    expect(response.body).to.be.empty
                })
            })
    
            describe('for request params that match no records', () => {
    
                beforeEach(() => {
                    randomString = crypto.randomBytes(8).toString('hex')
                })
    
                it('should return 201 response', async () => {
                    const response = await supertest(server)
                        .put(`/api/population/state/${randomString}/city/${randomString}`)
                        .set('Content-Type', 'text/plain')
                        .send("343584")
    
                    expect(response.statusCode).to.equal(201)
                    expect(response.body).to.be.empty
                })
            })
        })

        describe('with a different content-type', () => {

            it('should return 400 response', async () => {
                const response = await supertest(server)
                    .put(`/api/population/state/Florida/city/Orlando`)
                    .set('Content-Type', 'application/json')
                    .send("343584")

                expect(response.statusCode).to.equal(400)
                expect(response.body).to.be.empty
            })
        })

        
    })
})