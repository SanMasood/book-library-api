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
                    name: 'Jules Verne',
                });
                const newAuthorRecord = await Author.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal('Jules Verne');
                expect(newAuthorRecord.name).to.equal('Jules Verne');
            });
            it ('throws an error if author is empty', async() => {
                const response = await request(app).post('/authors').send({
                  name: '',
              });
              const newAuthorRecord = await Author.findByPk(response.body.id, {
                  raw: true,
              });
              expect(response.status).to.equal(400);
              expect(response.body.errors.length).to.equal(1);
              expect(newAuthorRecord).to.equal(null);  
            })

        })
    })
})
    /*describe('With records in the table', () => {
        let authors;
        beforeEach(async() =>{
            await Author.destroy({where: {} });

            authors = await Promise.all([
                Author.create({
                  name: 'J. R. Tolkein',
                }),
                Author.create({
                    name: 'J. K. Rowling',                  
                }),
                  Author.create({
                    name: 'Enid Blyton',
                })
            ]);
        })
    describe('GET /authors', () => {
        it ('gets all authors', async () => {
            const response = await request(app).get('/authors');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);

            response.body.forEach((auth) => {
                const expected = authors.find((a)=> a.id===auth.id);
                expect(auth.name).to.equal(expected.name);
            })

        })
    })

})*/

