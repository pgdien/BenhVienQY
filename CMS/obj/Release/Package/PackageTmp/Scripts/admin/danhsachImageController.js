myApp.controller("danhsachImageController", ['$scope', '$http', '$window', 'Category', 'MenuMultiLevel', 'uiGridConstants', function ($scope, $http, $window, Category, MenuMultiLevel, uiGridConstants) {
    $scope.image = {};
    $scope.images = [];
    $scope.gridOptions = {};

    //Lấy danh sách Image
    $http.get('/API/ImagesAPI/').success(function (data) {
        $scope.gridOptions.data = data;
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
            name: 'idImage',
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
            name: 'anh',
            width: 300,
            cellTemplate: '<div style="text-align:center" class="ngCellText ui-grid-cell-contents ng-binding ng-scope"><img class="img-responsive" ng-src="{{COL_FIELD}}" alt=""/></br>{{COL_FIELD}}</div>',
            enableSorting: false,
            enableFiltering: false
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
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditImage(row.entity.id)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteImage(row.entity.id)"><span class="fa fa-bitbucket"></span></button></div>',
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
    $scope.EditImage = function (idImage) {
        $window.location.href = '/Admin/Images/Create?id=' + idImage;
    }

    //Delete
    $scope.DeleteImage = function (idImage) {
        var idImage = idImage;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/ImagesAPI/' + idImage)
            .success(function () {
                $http.get('/API/ImagesAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);