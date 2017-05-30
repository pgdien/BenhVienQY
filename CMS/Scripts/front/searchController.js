frontApp.controller("searchController", ['$scope', '$http', '$window', '$cookieStore', function ($scope, $http, $window, $cookieStore) {

    $scope.search = function () {

        $cookieStore.put('search', $scope.searchText);

        $window.location.href = '/tim-kiem';
    };

}]);