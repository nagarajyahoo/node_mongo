const expect = require('expect');
const request = require('supertest');

const {Todo} = require('../../mongoose_module/model/Todo');
const {app} = require('../../controller/TodoController');

describe('POST /todos', (done) => {
    beforeEach((done) => {
        Todo.remove({})
            .then(() => done());
    });

    //test case
    it('should create new Todo', (done) => {
        var text = "some test text";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should fail with validation errors', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body.err).toBe('Check input values')
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({}).then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    })
});