// Create a web server that will listen on port 3000
// The server will have the following routes:
//     GET /comments - returns a list of all comments
//     POST /comments - adds a new comment
//     GET /comments/:id - returns a single comment with the matching id
//     PUT /comments/:id - updates a single comment with the matching id
//     DELETE /comments/:id - deletes a single comment with the matching id
// The server will keep the comments in memory (it does not need to store them to a file or database)
// Use the body-parser npm module to read the body of the requests.
// You can use the following comments array to get started:

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var comments = [
    { id: 1, author: 'Newton', text: 'This is a comment' },
    { id: 2, author: 'Einstein', text: 'This is another comment' }
];

app.use(bodyParser.json());

app.get('/comments', function (req, res) {
    res.json(comments);
});

app.post('/comments', function (req, res) {
    var comment = req.body;
    comment.id = comments.length + 1;
    comments.push(comment);
    res.json(comment);
});

app.get('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = comments.filter(function (comment) {
        return comment.id == id;
    });
    res.json(comment[0]);
});

app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = req.body;
    comments.forEach(function (c) {
        if (c.id == id) {
            c.author = comment.author;
            c.text = comment.text;
        }
    });
    res.json(comment);
});

app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = comments.filter(function (comment) {
        return comment.id == id;
    });
    comments = comments.filter(function (comment) {
        return comment.id != id;
    });
    res.json(comment[0]);
});

app.listen(3000);
console.log('Server is running at http://localhost:3000/');

