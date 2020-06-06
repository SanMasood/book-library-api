const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe ('/authors', () => {
    before(async () => Author.sequelize.sync());

    describe ('with no authors in the table', () => {
        describe ('POST /authors', () => {

            it('Creates a new author', async() => {
                const response = await request(app).post('/authors').send({
                    author: 'Jules Verne',
                });
                const newAuthorRecord = await Author.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(200);
                expect(response.body.author).to.equal('Jules Verne');
                expect(newAuthorRecord.author).to.equal('Jules Verne');
            })
        })

    })

})
