const { expect } = require('chai');
const request = require('supertest');
const { Genre } = require('../src/models');
const app = require('../src/app');

describe ('/genres', () => {
    before(async () => {   
         await Genre.sequelize.sync();    
         await Genre.destroy({ where: {} });    
    }); 
        

    describe ('with no genre in the table', () => {
        describe ('POST /genres', () => {

            it('Creates a new genre', async() => {
                const response = await request(app).post('/genres').send({
                    category: 'Horror',
                });
                const newGenreRecord = await Genre.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(200);
                expect(response.body.category).to.equal('Horror');
                expect(newGenreRecord.category).to.equal('Horror');
            });

            it('throws an error if genre is empty', async() => {
                const response = await request(app).post('/genres').send({
                  
              });
              const newGenreRecord = await Genre.findByPk(response.body.id, {
                  raw: true,
              });
              expect(response.status).to.equal(400);
              expect(response.body.errors.length).to.equal(1);
              expect(newGenreRecord).to.equal(null);  
            });

            it('throws an error if genre is null', async() => {
                const response = await request(app).post('/genres').send({
                  category: null,
              });
              const newGenreRecord = await Genre.findByPk(response.body.id, {
                  raw: true,
              });
              expect(response.status).to.equal(400);
              expect(response.body.errors.length).to.equal(1);
              expect(newGenreRecord).to.equal(null);  
            });

            it('throws an error for duplicate genre category', async() => {
                const response = await request(app).post('/genres').send({
                    category: 'Horror',
                });
                const newGenreRecord = await Genre.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(400);
                expect(response.body.errors.length).to.equal(1);
                expect(newGenreRecord).to.equal(null);  
            })

        })
    })

    describe('With genres in the table', () => {
        let genres;

        beforeEach(async() =>{
            await Genre.destroy({where: {} });

            genres = await Promise.all([
                Genre.create({
                  category: 'Science Fiction',
                }),
                Genre.create({
                    category: 'Physics',                  
                }),
                  Genre.create({
                    category: 'Kids',
                })
            ]);
        })
    describe('GET /genres', () => {
        it ('gets all genres', async () => {
            const response = await request(app).get('/genres');

            expect(response.status).to.equal(200);
            expect(response.body.length).to.equal(3);

            response.body.forEach((genre) => {
                const expected = genres.find((a)=> a.id===genre.id);
                expect(genre.category).to.equal(expected.category);
            })

        })
    })
    describe('GET /genres/:id', () => {
        it('gets genres record by id', async () => {
          const genre = genres[0];
          const response = await request(app).get(`/genres/${genre.id}`);
  
          expect(response.status).to.equal(200);
          expect(response.body.category).to.equal(genre.category);
          
        });
        it('returns a 404 error if the genre does not exist', async () => {
            const response = await request(app).get('/genres/000');
    
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
          });

    })

    describe('PATCH /genres/:id', () => {
        it ('updates genre category by id', async () => {
            const genre = genres[0];
            const response = await request(app)
            .patch(`/genres/${genre.id}`)
            .send({category : 'Thriller'});

            const updatedGenreRecord = await Genre.findByPk(genre.id, {
                raw : true,
            });
            expect(response.status).to.equal(200);
            expect(updatedGenreRecord.category).to.equal('Thriller');
        })
        it ('throws an error if genre id not found', async() => {
            const response = await request(app)
            .patch(`/genres/000`)
            .send({ category : 'Test Genre'});

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');
        })
    })
    describe('DELETE /genres', () => {
        xit ('deletes genre record by id', async() => {
            const genre = genres[0];
            const response = await request(app)
            .delete(`/genres/${genre.id}`);
            const deletedGenre = await Genre.findByPk(genre.id, {raw:true});

            expect(response.status).to.equal(204);
            expect(deletedGenre).to.equal(null);
        })
        xit ('throws an error if genre by ID is not found', async() => {
            const response = await request(app).delete('genres/00000');
            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal('The genre could not be found.');

        })

    })

})
})



