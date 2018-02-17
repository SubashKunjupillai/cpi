(function () {
    'use strict';

    angular
        .module('app')
        .controller('Patriortists.IndexController', Controller);

    function Controller(PatriortistService) {
        var vm = this;

        vm.patriortists = [];

        initController();

        function initController() {
            vm.loading = true;
            PatriortistService.GetAll()
                .then(function (posts) {
                    vm.loading = false;
                    vm.patriortists = patriortists;
                });
        }
    }

})();
