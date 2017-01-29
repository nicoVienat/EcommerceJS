// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'app.data-service'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

 .config(function ($stateProvider, $urlRouterProvider) {

     $stateProvider
     .state('tab', {
         url: '/tab',
         abstract: true,
         templateUrl: 'views/tabs.html',
         controller: 'indexController'
     })

     .state('tab.imageList', {
         url: '/imageList',
         views: {
             imageListContainer: {
                 templateUrl: 'views/imageList.html',
                 controller: 'imageListController'
             }
         }
     })
     .state('tab.addPost', {
         url: '/addPost',
         views: {
             addPostContainer: {
                 templateUrl: 'views/addPost.html',
                 controller: 'addPostController'
             }
         }
     })
     .state('tab.profil', {
         url: '/profil',
         views: {
             profilContainer: {
                 templateUrl: 'views/profil.html',
                 controller: 'profilController'
             }
         }
     })
     .state('tab.likes', {
         url: '/likes/:postid',
         views: {
             imageListContainer: {
                 templateUrl: 'views/likes.html',
                 controller: 'likePostController'
             }
         }
     })
     .state('tab.comments', {
         url: '/comments/:postid',
         views: {
             imageListContainer: {
                 templateUrl: 'views/comments.html',
                 controller: 'commentPostController'
             }
         }
     })

     $urlRouterProvider.otherwise('/tab/imageList');
 })

.controller('indexController', ['$scope', 'dataService', function ($scope, dataService) {
    dataService.autoLogin();
}])

.controller('imageListController', ['$scope', 'dataService', function ($scope, dataService) {
    
    $scope.likeDisabled = false;
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
        dataService.getPosts().then(function (posts) {
            $scope.posts = posts;
        })
    });
      
    $scope.doRefresh = function () {
        dataService.getPosts().then(function (posts) {
            $scope.posts = posts;
            $scope.$broadcast('scroll.refreshComplete');
        })
    };

    $scope.likeOrUnlikePost = function (post) {
        $scope.likeDisabled = true;
        if (post.likedByCurrentUser) {
            post.likedByCurrentUser = false;
            dataService.unlikePost(post.id).then(function () {
                post.likesCount--;
                $scope.likeDisabled = false;
            }
            , function (err) {
                $scope.likeDisabled = false;
                post.likedByCurrentUser = true;
                console.log('unlike');
            });
        } else {
            post.likedByCurrentUser = true;
            dataService.likePost(post.id).then(function () {
                post.likesCount++;
                $scope.likeDisabled = false;
            }
            , function (err) {
                $scope.likeDisabled = false;
                post.likedByCurrentUser = false;
                console.log('like');
            });
        }
    };
}])

.controller('profilController', ['$scope', 'dataService', function ($scope, dataService) {

}])

.controller('addPostController', ['$scope', 'dataService', function ($scope, dataService) {
    var takeNewPicture = function () {

    }

}])

.controller('likePostController', ['$scope', 'dataService', '$stateParams', function ($scope, dataService, $stateParams) {
    dataService.getLikes($stateParams.postid).then(function (likes) {
        $scope.likes = likes;
    })
    $scope.doRefresh = function () {
        dataService.getLikes($stateParams.postid).then(function (likes) {
            $scope.likes = likes;
            $scope.$broadcast('scroll.refreshComplete');
        })
    };
}])

.controller('commentPostController', ['$scope', 'dataService', '$stateParams', '$ionicPopup', function ($scope, dataService, $stateParams, $ionicPopup) {
    $scope.currentUser = dataService.getCurrentUser();

    dataService.getComments($stateParams.postid).then(function (comments) {
        console.log(comments);
        $scope.comments = comments;
    })
    $scope.doRefresh = function () {
        dataService.getComments($stateParams.postid).then(function (comments) {
            $scope.comments = comments;
            $scope.$broadcast('scroll.refreshComplete');
        })
    };

    $scope.sendMessage = function () {
        dataService.sendComment($scope.message, $scope.comments[0].postId).then(function (res) {
            dataService.getComments($stateParams.postid).then(function (comments) {
                $scope.comments = comments;
                $scope.$broadcast('scroll.refreshComplete');
            })
        })
    };

    $scope.deleteMessage = function (comment) {


        var confirmPopup = $ionicPopup.confirm({
            title: 'Suppression message',
            template: 'Voulez-vous supprimer ce message ?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                dataService.deleteComment(comment).then(function (res) {
                    dataService.getComments($stateParams.postid).then(function (comments) {
                        $scope.comments = comments;
                    })
                }), function (err) {
                    console.log('error deleteComment');
                }
                console.log('Oui');
            } else {
                console.log('Non');
            }
        });
    }
}])