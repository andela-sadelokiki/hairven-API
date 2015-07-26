var app = angular.module('testApp', []);

/*app.controller('mainController', function($scope, $upload) {
 
$scope.uploadFile = function(){
 
 $scope.fileUploader = function(files) {
     if (files && files.length) {
        $scope.file = files[0];
     }
 
     $upload.upload({
       url: '/api/uploads', //node.js route
       file: $scope.file
     })
     .success(function(data) {
       console.log(data, 'uploaded');
      });
 
    };
};
});*/

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('uploads', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    };
}]);

app.controller('mainController', ['$scope', 'uploads', function($scope, uploads){
    
    $scope.uploadFile = function(){
        var file = $scope.photo;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "uploads";
        uploads.uploadFileToUrl(file, uploadUrl);
    };
    
}]);