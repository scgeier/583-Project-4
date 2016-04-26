  
var app = angular.module('appendix', []);

app.controller('HeaderController', ['$http', function($http) {

    this.headers = [];
    var _this = this;

    $http.get('js/appendix.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.headers = data;
            

        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });

this.activeHeader = "";
this.setActiveHeader = function(item){
   this.activeHeader = item;
   console.log(this.activeHeader);
};
    
}]);

