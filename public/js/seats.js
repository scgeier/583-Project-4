  
var app = angular.module('seats', []);

app.controller('SeatsController', ['$http', function($http) {

    this.seats = [];
    var _this = this;

    $http.get('seats.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.seats = data;
        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });
        
    
}]);