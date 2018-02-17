(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages'])
        .config(config)
        .run(run);

    function config($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        // set variable to control behaviour on initial app load
        window.initialLoad = true;

        $locationProvider.html5Mode(true);

        // default route
        $urlRouterProvider.otherwise("/news");

        $stateProvider
            .state('home', {
                url: '/?:page',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/?xhr=1' + (stateParams.page ? '&page=' + stateParams.page : '');
                }
            })
            .state('news', {
                url: '/news',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/news?xhr=1' + (stateParams.page ? '&page=' + stateParams.page : '');
                }
            })
            .state('post-details', {
                url: '/post/:year/:month/:day/:slug',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/post/' + stateParams.year + '/' + stateParams.month + '/' + stateParams.day + '/' + stateParams.slug + '?xhr=1';
                }
            })
            .state('posts-for-tag', {
                url: '/posts/tag/:tag',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/posts/tag/' + stateParams.tag + '?xhr=1';
                }
            })
            .state('posts-for-month', {
                url: '/posts/:year/:month',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/posts/' + stateParams.year + '/' + stateParams.month + '?xhr=1';
                }
            })
            .state('page-details', {
                url: '/page/:slug',
                templateUrl: function (stateParams) {
                    return window.initialLoad ? null :
                        '/page/' + stateParams.slug + '?xhr=1';
                }
            })
            .state('archive', {
                url: '/archive',
                templateUrl: '/archive?xhr=1'
            })
            .state('videos', {
                url: '/videos',
                templateUrl: '/videos?xhr=1'
            })
            .state('patriortist', {
                url: '/patriortist',
                templateUrl: '/patriortist?xhr=1',
                controller: 'Patriortist.IndexController'
            })
            .state('patriortist-thanks', {
                url: '/patriortist-thanks',
                templateUrl: '/patriortist-thanks?xhr=1'
            });

        // mark all requests from angular as ajax requests
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    function run($rootScope, $timeout, $location, $window) {
        // initialise google analytics
        $window.ga && $window.ga('create', 'UA-30211492-1', 'auto');

        $rootScope.$on('$stateChangeSuccess', function () {
            // hide mobile nav
            $rootScope.showNav = false;

            // track pageview
            var urlWithoutHash = $location.url().split('#')[0];
            $window.ga && $window.ga('send', 'pageview', urlWithoutHash);

            // jump to top of page if not initial page load
            if (!window.initialLoad) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }

            $timeout(function () {
                // run syntax highlighter plugin
                SyntaxHighlighter.highlight();
            });

            window.initialLoad = false;
        });
    }

})();
