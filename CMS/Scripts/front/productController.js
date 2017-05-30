frontApp.controller("productController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.product = {};
    $scope.products = [];
    $scope.idCategoryProduct;
    $scope.idProduct = angular.element('#idProduct').val();

    $http.get('/API/ProductsAPI/' + $scope.idProduct)
        .success(function (data) {
            $scope.product = data;
            $scope.product.content = $sce.trustAsHtml(data.content)
            $scope.idCategoryProduct = data.idCategoryProduct;

            //Sản phẩm cùng danh mục
            $http.get('/API/ProductsAPI/')
                .success(function (data) {
                    angular.forEach(data, function (value, key) {
                        if (value.idCategoryProduct == $scope.idCategoryProduct && value.idProduct != $scope.idProduct) {
                            $scope.products.push(value);
                        };
                    });
                });
        });
}]);