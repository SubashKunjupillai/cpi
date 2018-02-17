(function () {
    'use strict';

    angular
        .module('app')
        .controller('Patriortists.AddEditController', Controller);

    function Controller($stateParams, $location, PatriortistService, AlertService) {
        var vm = this;

        vm.Patriortist = {};
        vm.savePatriortist = savePatriortist;

        initController();

        function initController() {
            vm.loading = 0;

            if ($stateParams._id) {
                vm.loading += 1;
                PatriortistService.GetById($stateParams._id)
                    .then(function (patriortist) {
                        vm.loading -= 1;
                        vm.patriortist = patriortist;
                    });
            } else {
                // initialise with defaults
                vm.patriortist = {
                    publishDate: moment().format('YYYY-MM-DD'),
                    publish: true
                };
            }
        }

        function savePatriortist() {
            PatriortistService.Save(vm.patriortist)
                .then(function () {
                    AlertService.Success('Member information saved', true);
                    $location.path('/patriortists');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }
    }

})();
