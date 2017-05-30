myApp.controller("themPostController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'MenuMultiLevel', 'Url', function ($scope, $http, $window, $location, $filter, Alias, MenuMultiLevel, Url) {
    $scope.post = {};
    $scope.categories = [];
    $scope.category = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.post.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    $scope.chooseImageNgang = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.post.imageNgang = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                alert("Yes");
                finder.on('files:choose', function (evt) {
                    var file = evt.data.files.first();
                    elementId = file.getUrl();
                });

                finder.on('file:choose:resizedImage', function (evt) {
                    elementId = evt.data.resizedUrl;
                });
            }
        });
    }


    //Lấy idPost từ Url
    $scope.currentIdPost = Url.getParameterByName('idPost');

    //Nếu sửa thì trả về giá trị của Post
    if ($scope.currentIdPost) {
        $http.get('/API/PostsAPI/' + $scope.currentIdPost)
            .success(function (data) {
                $scope.post = {
                    idPost: data.idPost,
                    idCategory: data.idCategory,
                    idUserCreated: data.idUserCreated,
                    idUserModified: data.idUserModified,
                    timeCreated: data.timeCreated,
                    timeModified: data.timeModified,
                    title: data.title,
                    alias: data.alias,
                    content: data.content,
                    note: data.note,
                    description: data.description,
                    published: data.published,
                    image: data.image,
                    tags: data.tags,
                    version: data.version,
                    deleted: data.deleted,
                    featured: data.featured,
                    metadescription: data.metadescription,
                    metakewords: data.metakewords,
                    author: data.author,
                    robots: data.robots,
                    imageNgang: data.imageNgang,
                };
                //Giá trị cho Danh mục
                $scope.category = { id: data.idCategory };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
        $scope.post = {
            published: 1,
            featured: 0,
            robots: 'Index, Follow',
            idUserCreated: angular.element('#user').val(),
            timeCreated: new Date(),
            idUserModified: angular.element('#user').val(),
            timeModified: new Date()
        };
        $scope.category = { id: 1 };
    }

    //Lấy danh sách Category gán cho $scope.categories
    $http.get('/API/CategoriesAPI/').success(function (data) { $scope.categories = MenuMultiLevel.getDropdownMenu(data); });

    //Lưu bài viết
    $scope.savePost = function () {
        $scope.post.idCategory = $scope.category.id;
        if ($scope.currentIdPost) {
            $scope.post.idUserModified = angular.element('#user').val(),
            $scope.post.timeModified = new Date()
            $http.put('/API/PostsAPI/' + $scope.post.idPost, $scope.post)
            .success(function () {
                toastr.success('Thành công', 'Lưu Bài viết');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Bài viết')
            });
        } else {
            $http.post('/API/PostsAPI/', $scope.post)
            .success(function () {
                toastr.success('Thành công', 'Thêm Bài viết');
                $window.location.href = '/Admin/Posts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Bài viết');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.savePostAndExit = function () {
        $scope.post.idCategory = $scope.category.id;
        if ($scope.currentIdPost) {
            $scope.post.idUserModified = angular.element('#user').val(),
            $scope.post.timeModified = new Date()
            $http.put('/API/PostsAPI/' + $scope.post.idPost, $scope.post)
            .success(function () {
                $window.location.href = '/Admin/Posts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Bài viết');
            });
        } else {
            $http.post('/API/PostsAPI/', $scope.post)
            .success(function () {
                $window.location.href = '/Admin/Posts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Bài viết');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.savePostAndNew = function () {
        $scope.post.idCategory = $scope.category.id;
        if ($scope.currentIdPost) {
            $scope.post.idUserModified = angular.element('#user').val(),
            $scope.post.timeModified = new Date()
            $http.put('/API/PostsAPI/' + $scope.post.idPost, $scope.post)
            .success(function () {
                $window.location.href = '/Admin/Posts/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/PostsAPI/', $scope.post)
            .success(function () {
                $window.location.href = '/Admin/Posts/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Bài viết')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Posts';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.post.alias = Alias.genAlias($scope.post.title);
    };
}]);