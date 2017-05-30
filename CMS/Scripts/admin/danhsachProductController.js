myApp.controller("danhsachProductController", ['$scope', '$http', '$window', 'CategoryProduct', 'MenuMultiLevel', 'uiGridConstants', function ($scope, $http, $window, CategoryProduct, MenuMultiLevel, uiGridConstants) {
    $scope.product = {};
    $scope.products = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/API/ProductsAPI/').success(function (data) {
        $scope.gridOptions.data = data;
        angular.forEach(data, function (value, key) {
            $http.get('/API/CategoryProductsAPI/' + data[key].idCategoryProduct)
                .success(function (category) {
                    $scope.gridOptions.data[key].idCategory = category.title;
                });
        });
    });

    //Tùy chỉnh Column
    $scope.gridOptions.columnDefs =
    [
        {
            displayName: "STT",
            name: 'stt',
            enableCellEdit: false,
            enableSorting: false,
            enableFiltering: false,
            width: 55,
            cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        },
        {
            displayName: "ID",
            name: 'idProduct',
            enableSorting: false,
            width: 60,
        },
        {
            displayName: "Tiêu đề",
            name: 'title',
            enableSorting: false
        },
        {
            displayName: "Alias",
            name: 'alias',
            enableSorting: false
        },
        {
            displayName: "Danh mục",
            name: 'idCategory',
            enableSorting: false
        },
        {
            displayName: "Xuất bản",
            name: 'published'
        },
        {
            displayName: "Nổi bật",
            name: 'feature'
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditProduct(row.entity.idProduct)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteProduct(row.entity.idProduct)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Tim kiem
    $scope.gridOptions.enableFiltering = true;
    //Select
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;

    //Grid API
    $scope.gridOptions.onRegisterApi = function (gridApi) {

    };

    //Edit
    $scope.EditProduct = function (idProduct) {
        $window.location.href = '/Admin/Products/Create?idProduct=' + idProduct;
    }

    //Delete
    $scope.DeleteProduct = function (idProduct) {
        var idProduct = idProduct;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/ProductsAPI/' + idProduct)
            .success(function () {
                $http.get('/API/ProductsAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);