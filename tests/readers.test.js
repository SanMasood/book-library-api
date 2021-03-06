/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Reader } = require('../src/models');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => Reader.sequelize.sync());

  describe('with no records in the database', () => {

    describe('POST /readers', () => {

      it('creates a new reader in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Elzabeth Bennet',
          email: 'uture_ms_darcy@gmail.com',
          password: 'elzabeth12345'
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });//why finding??

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal('Elzabeth Bennet');
        expect(response.body.password).to.equal(undefined);//for not returning password

        expect(newReaderRecord.name).to.equal('Elzabeth Bennet');
        expect(newReaderRecord.email).to.equal('uture_ms_darcy@gmail.com');
        expect(newReaderRecord.password).to.equal('elzabeth12345');
      });
      it('throws an error if name is empty', async() => {

        const response = await request(app).post('/readers').send({
          name: '',
          email: 'garyvee@gmail.com',
          password: 'password5454',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newReaderRecord).to.equal(null);
        //console.log (response.body.errors);
      });

      it('throws an error if email is in wrong format', async() => {

        const response = await request(app).post('/readers').send({
          name: 'Gary Vee',
          email: 'garyveegmaildotcom',
          password: 'password5454',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newReaderRecord).to.equal(null);
      });
      it('throws an error if password is in wrong format', async() => {

        const response = await request(app).post('/readers').send({
          name: 'Gary Vee',
          email: 'garyvee@ldot.com',
          password: 'pass4',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(400);
        expect(response.body.errors.length).to.equal(1);
        expect(newReaderRecord).to.equal(null);
      });
      it ('Throws an error if email is already registered', async() => {
        const response1 = await request(app).post('/readers').send({
          name : 'Larry Shaw',
          email: 'larry@live.com',
          password: 'larry1234567',
        });
        const response2 = await request(app).post('/readers').send({
          name : 'Larry King',
          email : 'larry@live.com',
          password: 'larry543fds',
        });
        const newReaderRecord1 = await Reader.findByPk(response1.body.id, {
          raw: true,
        });
        const newReaderRecord2 = await Reader.findByPk(response2.body.id, {
          raw: true,
        });
        expect(response1.status).to.equal(200);
        expect(newReaderRecord1.email).to.equal('larry@live.com');
        //expect(newReaderRecord1).to.be.true; 

        expect(response2.status).to.equal(400);
        expect(response2.body.errors.length).to.equal(1);
        expect(newReaderRecord2).to.be.null;
      });
      
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      await Reader.destroy({ where: {} });

      readers = await Promise.all([
        Reader.create({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'elizabeth12345'
        }),
        Reader.create({ name: 'Arya Stark', email: 'vmorgul@me.com', password: 'arya12345' }),
        Reader.create({ name: 'Lyra Belacqua', email: 'darknorth123@msn.org', password: 'lyra12345' }),
      ]);
    });

    describe('GET /readers', () => {
      it('gets all readers records', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
        expect(response.body.password).to.equal(undefined);


        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
        });
      });
    });

    describe('GET /readers/:id', () => {
      it('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(undefined);

      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/readers/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /readers/:id', () => {
      it('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: 'miss_e_bennet@gmail.com' });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/readers/12345')
          .send({ email: 'some_new_email@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('DELETE /readers/:id', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(200);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/readers/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});
