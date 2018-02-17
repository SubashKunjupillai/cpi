(function () {
    'use strict';

    angular
        .module('app')
        .controller('Patriortist.IndexController', Controller);

    function Controller($stateParams, $location, PatriortistService) {
        var vm = this;

        vm.savePatriortist = savePatriortist;

        function savePatriortist() {
            vm.error = null;
            vm.loading = true;
            PatriortistService.create(vm)
                .then(function () {
                    $location.path('/patriortist-thanks');
                })
                .catch(function (error) {
                    vm.error = 'Error: ' + error;
                })
                .finally(function () {
                    vm.loading = false;
                });
        };
    }
})();
