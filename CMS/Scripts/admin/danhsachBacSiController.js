myApp.controller("danhsachBacSiController", ['$scope', '$http', '$window', 'uiGridConstants', function ($scope, $http, $window, uiGridConstants) {
    $scope.bacSis = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/API/BacSiAPI/').success(function (data) {
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 40;
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
            displayName: "Họ tên",
            name: 'hoTen',
            enableSorting: false,
        },
        {
            displayName: "Địa chỉ",
            name: 'diaChi',
            enableSorting: false
        },
        {
            displayName: "sdt",
            name: 'sdt',
            enableSorting: false
        },
        {
            displayName: "Chức vụ",
            name: 'chucVu',
            enableSorting: false
        },
        {
            displayName: "Công việc",
            name: 'congViec',
            enableSorting: false
        },
        {
            displayName: "Chức vụ",
            name: 'chucVu',
            enableSorting: false
        },
        //{
        //    displayName: "Hình ảnh",
        //    name: 'image',
        //    width: 300,
        //    cellTemplate: '<div style="text-align:center" class="ngCellText ui-grid-cell-contents ng-binding ng-scope"><img class="img-responsive" ng-src="{{COL_FIELD}}" alt=""/></br>{{COL_FIELD}}</div>',
        //    enableSorting: false,
        //    enableFiltering: false
        //},
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditBacSi(row.entity.id)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteBacSi(row.entity.id)"><span class="fa fa-bitbucket"></span></button></div>',
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
    $scope.EditBacSi = function (id) {
        $window.location.href = '/Admin/BacSis/Create?id=' + id;
    }

    //Delete
    $scope.DeleteBacSi = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/BacSiAPI/' + id)
            .success(function () {
                $http.get('/API/BacSiAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);