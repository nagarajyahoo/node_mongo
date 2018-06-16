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
                    .then((result) => {
                        // console.log("inserted many values", result);
                    })
                    .catch((ex) => {
                        return done(ex);
                    });
                return done();
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
                }).catch((e) => {
                    return done(e);
                });

                return done();
            });
    });

    it('should fail with validation errors', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body.err).toBe('Check input values');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            });
        return done();
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

describe('GET /todos/{id}', () => {
    it('Should return todo detail of give ID', (done) => {
        var todo = new Todo({
            "text": "some text for testing",
            "completed": false
        });

        todo.save()
            .then((result) => {
                var id = result._id;

                request(app)
                    .get('/todos/' + id)
                    .expect(200)
                    .expect((res) => {
                        // console.log(res.body);
                        expect(JSON.stringify(res.body)).toBe(JSON.stringify(result));
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            })
            .catch((ex) => {
                console.log("error", ex);
                done(ex);
            });
    });

    it('Should return error for invalid ID', (done) => {
        var expected = {"message": "incorrect todo ID"};
        request(app)
            .get('/todos/234234')
            .expect(400)
            .expect((res) => {
                expect(JSON.stringify(res.body)).toBe(JSON.stringify(expected));
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                else {
                    done();
                }
            })
    });
});


describe('DELETE /todo/{id}', () => {
    it('Should delete the todo by given ID', (done) => {
        var todo = new Todo({
            "text": "some text for testing",
            "completed": false
        });

        todo.save()
            .then((result) => {
                var id = result._id;

                request(app)
                    .del('/todos/' + id)
                    .expect(200)
                    .expect((res) => {
                        expect(JSON.stringify(res.body)).toBe(JSON.stringify(result));
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    })
            })
            .catch((ex) => {
                return done(ex);
            });
    });

    it('Should give 404 if not found with valid ID format', (done) => {
        var todoID = "5b251f5a84a40505ecd2a2a4";
        Todo.findByIdAndRemove(todoID)
            .then((result) => {
                request(app)
                    .del('/todos/' + todoID)
                    .expect(404)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            })
            .catch((ex) => {
                return done(ex);
            });
    });
});

describe('PUT /todos/{id}', () => {
    it('Should update the todo', (done) => {
        var todo = new Todo({
            "text": "dummy text",
            "completed": false
        });

        todo.save()
            .then((savedTodo) => {
                var todoId = savedTodo._id;

                var todoToUpdate = {
                    "text": "dummy text updated",
                    "completed": true
                };

                request(app)
                    .put(`/todos/${todoId}`)
                    .send(todoToUpdate)
                    .expect(200)
                    .expect((res) => {
                        // console.log(res.body);
                        expect(res.body.completed).toBe(true);
                        expect(res.body.text).toBe("dummy text updated");
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    })
            })
            .catch((ex) => {
                return done(ex);
            });
    });

    it('Should send 404 for unknown todo ID', (done) => {
        var todoID = "5b251f5a84a40505ecd2a2a4";
        Todo.findByIdAndRemove(todoID)
            .then((result) => {
                request(app)
                    .put('/todos/' + todoID)
                    .expect(404)
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        return done();
                    });
            })
            .catch((ex) => {
                return done(ex);
            });
    });

    it('Should send 400 for invalid todo ID', (done) => {
        var todoID = "123";

        request(app)
            .put('/todos/' + todoID)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                return done();
            });
    });
});