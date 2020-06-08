const { expect } = require('chai');
const request = require('supertest');
const { Author } = require('../src/models');
const app = require('../src/app');

describe ('/authors', () => {
    before(async () => {   
         await Author.sequelize.sync();    
         await Author.destroy({ where: {} });    
    });         

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

            it('throws an error if author is empty', async() => {
                const response = await request(app).post('/authors').send({
                  name: '',
              });
              const newAuthorRecord = await Author.findByPk(response.body.id, {
                  raw: true,
              });
              expect(response.status).to.equal(400);
              expect(response.body.errors.length).to.equal(1);
              expect(newAuthorRecord).to.equal(null);  
            });

            it('throws an error if author is null', async() => {
                const response = await request(app).post('/authors').send({
                  name: null,
              });
              const newAuthorRecord = await Author.findByPk(response.body.id, {
                  raw: true,
              });
              expect(response.status).to.equal(400);
              expect(response.body.errors.length).to.equal(1);
              expect(newAuthorRecord).to.equal(null);  
            });

            /*it('throws an error for duplicate author name', async() => {
                const response = await request(app).post('/authors').send({
                    name: 'Jules Verne',
                });
                const newAuthorRecord = await Author.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors.length).to.equal(1);
                expect(newAuthorRecord).to.equal(null);  
            })*/

        })
    })

    describe('With authors in the table', () => {
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
    describe('GET /authors/:id', () => {
        it('gets authors record by id', async () => {
          const author = authors[0];
          const response = await request(app).get(`/authors/${author.id}`);
  
          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal(author.name);
          
        });
        it('returns a 404 error if the author does not exist', async () => {
            const response = await request(app).get('/authors/99');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');
          });

    })

    describe('PATCH /authors/:id', () => {
        it ('updates author name by id', async () => {
            const author = authors[0];
            const response = await request(app)
            .patch(`/authors/${author.id}`)
            .send({name : 'K yuyu'});

            const updatedAuthorRecord = await Author.findByPk(author.id, {
                raw : true,
            });
            expect(response.status).to.equal(200);
            expect(updatedAuthorRecord.name).to.equal('K yuyu');
        })
        it ('throws an error if author id not found', async() => {
            const response = await request(app)
            .patch(`/authors/000`)
            .send({ name : 'Test Author'});

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');
        })
    })
    describe('DELETE /authors', () => {
        it ('deletes author record by id', async() => {
            const author = authors[0];
            const response = await request(app)
            .delete(`/authors/${author.id}`);
            const deletedAuthor = await Author.findByPk(author.id, {raw:true});

            expect(response.status).to.equal(200);
            expect(deletedAuthor).to.equal(null);
        })
        it ('throws an error if author by ID is not found', async() => {
            const response = await request(app).delete('/authors/88');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The author could not be found.');

        })

    })

})
})



