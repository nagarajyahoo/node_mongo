const expect = require('expect');
const request = require('supertest');

const {Todo} = require('../../mongoose_module/model/Todo');
const {app} = require('../../controller/TodoController');

var prePopulatedTodos = [
    {
        "text": "First Todo",
        "completed": false
    },
    {
        "text": "Second Todo",
        "completed": false
    }
];

describe('POST /todos', (done) => {
    beforeEach((done) => {
        Todo.remove({})
            .then(() => {
                Todo.insertMany(prePopulatedTodos)
                    .then(() => {
                        done();
                    });
            });
    });

    //test case
    it('should create new Todo', (done) => {
        var text = "some test text";
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                // expect(res.values[2].text).toBe(text);
                // expect(res.count).toBe(prePopulatedTodos.length);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({}).then((todos) => {
                    expect(todos[2].text).toBe(text);
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
                    // expect(todos.length).toBe(prePopulatedTodos.length);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /todos', (done) => {
    it('should get all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                // expect(res.values.length).toBe(prePopulatedTodos.length);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();

                Todo.find({}).then((todos) => {
                    expect(todos.length).toBe(prePopulatedTodos.length);
                }).catch((e) => {
                    done(e);
                });
            });
    });
});