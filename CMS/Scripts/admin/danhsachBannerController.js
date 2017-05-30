myApp.controller("danhsachBannerController", ['$scope', '$http', '$window', 'uiGridConstants', function ($scope, $http, $window, uiGridConstants) {
    $scope.banners = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/API/BannerAPI/').success(function (data) {
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
            name: 'id',
            enableSorting: false,
            width: 60,
        },
        {
            displayName: "Tiêu đề",
            name: 'title',
            enableSorting: false
        },
        {
            displayName: "Link",
            name: 'link',
            enableSorting: false
        },
        {
            displayName: "Text Link",
            name: 'text_link',
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
            displayName: "Mô tả",
            name: 'description',
            enableSorting: false
        },
        {
            displayName: "Ghi chú",
            name: 'ghichu',
            enableSorting: false
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditBanner(row.entity.id)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteBanner(row.entity.id)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Phan trang
    $scope.gridOptions.paginationPageSizes = [10, 25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;

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
    $scope.EditBanner = function (id) {
        $window.location.href = '/Admin/Banners/Create?id=' + id;
    }

    //Delete
    $scope.DeleteBanner = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/BannerAPI/' + id)
            .success(function () {
                $http.get('/API/BannerAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);