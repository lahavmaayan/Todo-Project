var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://Maayan:Shahar@ds045704.mlab.com:45704/todo', function(err, res) {
		if (err){
			console.log('error connecting to the DB');
		} else{
			console.log('connected to the DB');
		}
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
    todo: String,
    responsible: String
});

//get the todos
app.get('/api/todos', function(req, res){
    //get all the todos from the DB
    Todo.find(function(err, todos){
        if(err){
            res.send(err);
        }
        res.json(todos); // return all the todos in JSON format.
    });
});
// create todo and send back all todos after creation
app.post('/api/todos', function(req, res){
    
    Todo.create({
        todo: req.body.todo,
        responsible: req.body.responsible,
        done: false
    }, function(err, todo){
        if (err){
            res.send('could not create a new todo' + err);
        }
        
        Todo.find(function(err, todos){
            if(err){
                res.send('couldnt find the todos in the db' + err );
            }
            res.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo){
        if(err){
            res.send('could not delete the todo' + err);
        }
        
        Todo.find(function(err, todos){
            if(err){
                res.send('could not get the todoes after the deletion' + err);
            }
            res.json(todos);
        });
    });
});

app.get('*', function(req, res){
    res.sendfile('./public/index.html');
})

app.listen(8080, function(){
    console.log('app is listening on port 8080');
});
