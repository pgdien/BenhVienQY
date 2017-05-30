myApp.controller("danhsachPostController", ['$scope', '$http', '$window', 'Category', 'MenuMultiLevel', 'uiGridConstants', function ($scope, $http, $window, Category, MenuMultiLevel, uiGridConstants) {
    $scope.post = {};
    $scope.posts = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/API/PostsAPI/').success(function (data) {
        $scope.gridOptions.data = data;
        angular.forEach(data, function (value, key) {
            $http.get('/API/CategoriesAPI/' + data[key].idCategory)
                .success(function (category) {
                    $scope.gridOptions.data[key].idCategory = category.title;
                });
        });
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 100;
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
            name: 'idPost',
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
            displayName: "Hình ảnh",
            name: 'image',
            width: 300,
            cellTemplate: '<div style="text-align:center" class="ngCellText ui-grid-cell-contents ng-binding ng-scope"><img class="img-responsive" ng-src="{{COL_FIELD}}" alt=""/></br>{{COL_FIELD}}</div>',
            enableSorting: false,
            enableFiltering: false
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
            name: 'featured'
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
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditPost(row.entity.idPost)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeletePost(row.entity.idPost)"><span class="fa fa-bitbucket"></span></button></div>',
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
    $scope.EditPost = function (idPost) {
        $window.location.href = '/Admin/Posts/Create?idPost=' + idPost;
    }

    //Delete
    $scope.DeletePost = function (idPost) {
        var idPost = idPost;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/PostsAPI/' + idPost)
            .success(function () {
                $http.get('/API/PostsAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);