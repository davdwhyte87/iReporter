import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app'

chai.use(chaiHttp)
const should=chai.should()

describe('try testing framework', () => {
    it('It should return', (done) => {
        chai.request(app).get('/')
        .end((err, res) => {
            res.should.have.status(200)
            done()
        })
    })
})
