  
var app = angular.module('nations', []);

app.controller('NationsController', ['$http', function($http) {

    var sortProperty = null;
    this.nations = [];

//Use nation name as the default sorting category in the Rankings table (in alphabetical order)//
    this.sortProperty = "name";
    this.reverseSort = false;
    
//Sort the chosen column on ng-click
    this.sort = function(prop){
                  this.sortProperty = prop;
                  this.reverseSort = !this.reverseSort;
                };
    
    var _this = this;

//Call the JSON data//
    $http.get('js/nations-table.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.nations = data;
            

        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });


    
}]);

