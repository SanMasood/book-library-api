/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before (async () => Book.sequelize.sync());

    describe('with no records in the Books table', () => {
        describe ('POST /books', () => {

            it ('creates a new book in the table', async() => {
                const response = await request(app).post('/books').send({
                    title: '30,000 Leagues Under the Sea',
                    author: 'Jules Vern',
                    genre: 'Adventure',
                    ISBN: 'KL3423125689'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });
                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal('30,000 Leagues Under the Sea');
                expect(newBookRecord.title).to.equal('30,000 Leagues Under the Sea');
                expect(newBookRecord.ISBN).to.equal('KL3423125689');    
            })
        })        
    })

    describe('With records in the table', () => {
        let books;
        beforeEach(async() =>{
            await Book.destroy({where: {} });

            books = await Promise.all([
                Book.create({
                  title: 'Lord of the Rings',
                  author: 'J. R. Tolkein',
                  genre: 'Fiction',
                  ISBN: 'TO8978675645'
                }),
                Book.create({
                    title: 'Harry Potter',
                    author: 'J. K. Rowling',
                    genre: 'Fantasy',
                    ISBN: 'JK6758475645'
                  }),
                  Book.create({
                    title: 'Flyaway Kite',
                    author: 'Enid Blyton',
                    genre: 'Kids',
                    ISBN: 'EB9998675645'
                  })
                ]);
            })
            
        describe('GET /books', () => {
            it('gets all book records', async() => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((book)=> {
                    const expected = 
                    books.find((a)=> a.id===book.id);
                    expect(book.title).to.equal(expected.title);
                    expect(book.ISBN).to.equal(expected.ISBN);
                })
            })
        })
        describe('GET /books/:title', () => {
            it('gets books by title', (done) => {
                request(app)
                  .get(`/books/${books.title}`)
                  .then((res) => {
                    expect(res.status).to.equal(200);
                    //expect(res.body.length).to.equal(3)
      
                  res.body.forEach((book) => { 
                    const expected = books.find((a) => a.title === book.title);
                    expect(book.title).to.equal(expected.title);
                    expect(book.author).to.equal(expected.author);
                  });
                  done();
                });
            });
            xit('returns a 404 if the book does not exist', (done) => {
                request(app)
                .get(`/book/123`)
                
                //const res = await request(app).get(`/books/123`);
                .then((res) => {

                expect(res.status).to.equal(404);
                expect(res.body.error).to.equal('No such book title found.');
                done();
              
            })
        
        });
    })
})
})