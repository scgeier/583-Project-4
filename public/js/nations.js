  
var app = angular.module('nations', []);

app.controller('NationsController', ['$http', function($http) {

    this.nations = [];
    var _this = this;

    $http.get('js/nations.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.nations = data;
        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });

    
}]);

