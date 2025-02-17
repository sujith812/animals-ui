require('should')

const http = require('http')
const request = require('supertest')
const url = 'http://localhost:2999'
const fs = require('fs')
const decache = require('decache')

const Horses = require('../../src/services/horses')
const service = new Horses(process.env.API_URL)
const horse = { name: 'Balck Beauty', description: 'its Beauty' }


let server
let app
let agent
let addedHorse
service.create(horse).then((data) => { addedHorse = data })

function startServer (done) {
  let port = process.env.PORT || '2999'
  app = require('../../src/app')
  decache('../../src/app')
  app.set('port', port)
  server = http.createServer(app)
  server.listen(port)
  server.on('listening', () => {
    agent = request.agent(server)
    done()
  })
  server.on('error', (error) => {
    console.log(error)
  })
}

describe('/', function () {

  beforeEach('Setup', function (done) {
    startServer(done)
  })

  it('should get horses', function () {
    return agent.get('/horses').expect(200).then(data => {
      data.text.includes('Horse').should.be.true()
    })
  })

  it('should get a horse', function () {
    return agent.get('/horses/123').expect(200).then(data => {
      data.text.includes('Horse').should.be.true()
    })
  })

  it('should get add horse page', function () {
    return agent.get('/horses/add').expect(200).then(data => {
      data.text.includes('Add a Horse').should.be.true()
    })
  })

  it('should add a horse', function () {
    return agent.post('/horses').expect(302).send({name: horse.name, description: horse.description})
  })

  it('should delete a horse', function () {
    return agent.get('/horses/delete/123').expect(302)
  })

  it('should get edit a horse page', function () {
    return agent.get('/horses/edit/123').expect(200).send({ name: 'Blackie' , id: addedHorse.id }).then(data => {
      data.text.includes('Edit a Horse').should.be.true()
    })
  })

  it('should update a horse', function () {
    return agent.post('/horses/update/123').expect(302).send({ id:'123', name: 'Blackie' , description: 'Edited' })
  })

  afterEach('Teardown', function () {
    console.log('Teardown')
    server.close()
    server = undefined
    app = undefined
  })
})
