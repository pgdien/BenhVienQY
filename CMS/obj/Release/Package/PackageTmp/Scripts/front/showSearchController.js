frontApp.controller("showSearchController", ['$scope', '$http', '$window', '$cookieStore', function ($scope, $http, $window, $cookieStore) {
    
    $scope.posts = [];
    $scope.products = [];

    $scope.searchText = $cookieStore.get('search');

    $http.get('/SanPham/Search?search=' + $scope.searchText)
        .success(function (data) {
            $scope.products = data;
        });
    $http.get('/BaiViet/Search?search=' + $scope.searchText)
        .success(function (data) {
            $scope.posts = data;
        });
    
}]);