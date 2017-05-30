myApp.controller("danhsachCategoryController", ['$scope', '$http', '$window', 'Category', 'MenuMultiLevel', 'uiGridConstants', function ($scope, $http, $window, Category, MenuMultiLevel, uiGridConstants) {
    $scope.category = {};
    $scope.categories = [];
    $scope.gridOptions = {};

    //Lấy danh sách Category
    $http.get('/API/CategoriesAPI/').success(function (data) { $scope.gridOptions.data = Category.getTable(data); });

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
            name: 'idCategory',
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
            displayName: "Xuất bản",
            name: 'published'
        },
        {
            displayName: "Ghi chú",
            name: 'note',
            enableSorting: false
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditCategory(row.entity.idCategory)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteCategory(row.entity.idCategory)"><span class="fa fa-bitbucket"></span></button></div>',
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

    $scope.EditCategory = function (idCategory) {
        $window.location.href = '/admin/categories/create?idCategory=' + idCategory;
    }

    //Delete
    $scope.DeleteCategory = function (idCategory) {
        var idCategory = idCategory;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Lấy category con của Category cần xóa và đổi idCategoryParent thành 1
            $http.get('/API/CategoriesAPI/').success(function (data) {
                var categories = Category.getallCategory(data);
                angular.forEach(categories, function (value, key) {
                    if (categories[key].idCategoryParent == idCategory) {
                        var category = categories[key];
                        category.idCategoryParent = null;
                        $http.put('/API/CategoriesAPI/' + category.idCategory, category);
                    }
                });
            });

            //Xóa
            $http.delete('/api/CategoriesAPI/' + idCategory)
            .success(function () {
                $http.get('/api/CategoriesAPI').success(function (data) { $scope.gridOptions.data = Category.getTable(data); });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }


}]);