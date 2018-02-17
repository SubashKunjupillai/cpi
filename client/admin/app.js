(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .config(config)
        .run(run);

    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/posts");

        $stateProvider
            .state('posts', {
                url: '/posts',
                templateUrl: 'posts/index.view.html',
                controller: 'Posts.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'posts' }
            })
            .state('posts/add', {
                url: '/posts/add',
                templateUrl: 'posts/add-edit.view.html',
                controller: 'Posts.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'posts' }
            })
            .state('posts/edit', {
                url: '/posts/edit/:_id',
                templateUrl: 'posts/add-edit.view.html',
                controller: 'Posts.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'posts' }
            })
            .state('pages', {
                url: '/pages',
                templateUrl: 'pages/index.view.html',
                controller: 'Pages.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'pages' }
            })
            .state('pages/add', {
                url: '/pages/add',
                templateUrl: 'pages/add-edit.view.html',
                controller: 'Pages.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'pages' }
            })
            .state('pages/edit', {
                url: '/pages/edit/:_id',
                templateUrl: 'pages/add-edit.view.html',
                controller: 'Pages.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'pages' }
            })
            .state('redirects', {
                url: '/redirects',
                templateUrl: 'redirects/index.view.html',
                controller: 'Redirects.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'redirects' }
            })
            .state('redirects/add', {
                url: '/redirects/add',
                templateUrl: 'redirects/add-edit.view.html',
                controller: 'Redirects.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'redirects' }
            })
            .state('redirects/edit', {
                url: '/redirects/edit/:_id',
                templateUrl: 'redirects/add-edit.view.html',
                controller: 'Redirects.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'redirects' }
            })
            .state('images', {
                url: '/images',
                templateUrl: 'images/index.view.html',
                controller: 'Images.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'images' }
            })
            .state('images/add', {
                url: '/images/add',
                templateUrl: 'images/add.view.html',
                controller: 'Images.AddController',
                controllerAs: 'vm',
                data: { activeTab: 'images' }
            })
            .state('videos', {
                url: '/videos',
                templateUrl: 'videos/index.view.html',
                controller: 'Videos.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'videos' }
            })
            .state('videos/add', {
                url: '/videos/add',
                templateUrl: 'videos/add-edit.view.html',
                controller: 'Videos.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'videos' }
            })
            .state('videos/edit', {
                url: '/videos/edit/:_id',
                templateUrl: 'videos/add-edit.view.html',
                controller: 'Videos.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'videos' }
            })
            .state('patriortist', {
                url: '/patriortist',
                templateUrl: 'patriortist/index.view.html',
                controller: 'Patriortist.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'patriortist' }
            })
            .state('patriortist/edit', {
                url: '/patriortist/edit/:_id',
                templateUrl: 'patriortist/add-edit.view.html',
                controller: 'Patriortist.AddEditController',
                controllerAs: 'vm',
                data: { activeTab: 'patriortist' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.view.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            });
    }

    function run($http, $rootScope, $window) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();
