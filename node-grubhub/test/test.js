var chai = require('chai')
var assert = require('chai').assert

var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var app = 'http://localhost:3100'

describe('Test scenario', function () {
  it('Test case', function () {
    chai
      .request(app)
      .get('/AllRestaurants/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})
describe('Test scenario 2', function () {
  it('Test case', function () {
    chai
      .request(app)
      .get('/Allitems/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})

describe('Test scenario 3', function () {
  it('Test case', function () {
    chai
      .request(app)
      .get('/AllRestaurants/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})

describe('Test scenario 4', function () {
  it('Test case', function () {
    chai
      .request(app)
      .post('/insertitems/')
      .send({
        itemname: 'Biryani',
        restid: 6,
        RestaurantName: 'BASIL',
        description: 'well well',
        price: 5
      })
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})
describe('Test scenario 5', function () {
  it('Test case', function () {
    chai
      .request(app)
      .post('/updateorderstatus/')
      .send({ orderstatus: 'Placed', orderid: 6 })
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})
