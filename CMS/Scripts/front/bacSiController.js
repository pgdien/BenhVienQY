frontApp.controller("bacSiController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.bacSis = []; 
    $scope.bacSi = [];
    $scope.id = angular.element('#id').val();

    $http.get('/API/BacSiAPI/')
        .success(function (data) {
            $scope.bacSis = data;
        });

    $http.get('/API/BacSiAPI/' + $scope.id)
        .success(function (data) {
            $scope.bacSi = data;
        })
}]);