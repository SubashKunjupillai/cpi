(function () {
    'use strict';

    angular
        .module('app')
        .controller('Images.IndexController', Controller);

    function Controller(ImageService) {
        var vm = this;

        vm.images = [];

        initController();

        function initController() {
            vm.loading = true;
            ImageService.GetAll()
                .then(function (images) {
                    vm.loading = false;
                    vm.images = images;
                });
        }
    }

})();
