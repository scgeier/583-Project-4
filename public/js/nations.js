  
var app = angular.module('nations', []);

app.controller('NationsController', ['$http', function($http) {

    var sortProperty = null;
    this.nations = [];
  
    this.sortProperty = "name";
    this.reverseSort = false;
    this.sort = function(prop){
                  this.sortProperty = prop;
                  this.reverseSort = !this.reverseSort;
                };
    
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

