myApp.controller("danhsachVideoController", ['$scope', '$http', '$window', '$sce', 'uiGridConstants', function ($scope, $http, $window, $sce, uiGridConstants) {
    $scope.videos = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/API/VideoAPI/').success(function (data) {
        angular.forEach(data, function (value, key) {
            value.link_video = $sce.trustAsResourceUrl(value.link_video);
        });
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 150;
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
            displayName: "Link bài viết",
            name: 'link_post',
            enableSorting: false
        },
        {
            displayName: "Video",
            name: 'link_video',
            width: 300,
            cellTemplate: '<div style="text-align:center" class="ngCellText ui-grid-cell-contents ng-binding ng-scope"><iframe width="300" height="150" src="{{COL_FIELD}}" frameborder="0" allowfullscreen></iframe></br>{{COL_FIELD}}</div>',
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
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditVideo(row.entity.id)"><span class="fa fa-edit"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteVideo(row.entity.id)"><span class="fa fa-bitbucket"></span></button></div>',
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
    $scope.EditVideo = function (id) {
        $window.location.href = '/Admin/Videos/Create?id=' + id;
    }

    //Delete
    $scope.DeleteVideo = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/VideosAPI/' + id)
            .success(function () {
                $http.get('/API/VideosAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);