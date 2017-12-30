(function () {
    'use strict';

    angular
        .module('app')
        .controller('Videos.IndexController', Controller);

    function Controller(VideoService) {
        var vm = this;

        vm.videos = [];

        initController();

        function initController() {
            vm.loading = true;
            VideoService.GetAll()
                .then(function (videos) {
                    vm.loading = false;
                    vm.videos = videos;
                });
        }
    }

})();
