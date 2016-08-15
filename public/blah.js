var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('mainController', ['$scope', '$http', function($scope, $http){
    $scope.formData = {};
    $scope.todoSelected = null;
    $scope.itemSelected = null;
    
    $http.get('/api/todos')
    .success(function(data){
        $scope.todos = data;
        console.log(data);
    })
    .error(function(error){
        console.lof('Error: '+ error);
    });
    
    $scope.addTodo = function(){
        $http.post('/api/todos', $scope.formData)
        .success(function(data){
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        })
        .error(function(error){
            console.log('Error: '+ error);
        });
            
        };
    
    $scope.setSelected = function(idSelected, itemSelected){
        if (idSelected == $scope.todoSelected){
            $scope.todoSelected = null;
            $scope.itemSelected = null;    
        } else{
            $scope.todoSelected = idSelected;
            console.log(idSelected);
            $scope.itemSelected = itemSelected;    
        }
        
    };
    
    $scope.deleteTodo = function(){
        $http.delete('/api/todos/' + $scope.itemSelected)
        .success(function(data){
            $scope.todos = data;
        })
        .error(function(error){
            console.log('Error: '+ error);
        })
    }
    
    }]);