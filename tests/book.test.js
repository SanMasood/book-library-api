/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
    before (async () => Book.sequelize.sync());

    describe('with no records in the Books table', () => {
        it ('creates a new book in the table', async() => {
            const response = await request(app).post('/books').send({
                title: '30,000 Leagues Under the Sea',
                author: 'Jules Vern',
                Genre: 'Adventure',
                isbn: 'KL3423125689'
            })
            const newBookRecord = await Book.findByPk(response.body.id, {
                raw: true,
            });
            expect(response.status).to.equal(200);
            expect(response.body.title).to.equal('30,000 Leagues Under the Sea');
            expect(newBookRecord.title).to.equal('30,000 Leagues Under the Sea');
            expect(newBookRecord.isbn).to.equal('KL3423125689');

        })
    })
})