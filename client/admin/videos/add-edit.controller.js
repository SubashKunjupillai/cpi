(function () {
    'use strict';

    angular
        .module('app')
        .controller('Videos.AddEditController', Controller);

    function Controller($stateParams, $location, VideoService, AlertService) {
        var vm = this;

        vm.video = {};
        vm.saveVideo = saveVideo;
        vm.deleteVideo = deleteVideo;

        initController();

        function initController() {
            vm.loading = 0;

            if ($stateParams._id) {
                vm.loading += 1;
                VideoService.GetById($stateParams._id)
                    .then(function (video) {
                        vm.loading -= 1;
                        vm.video = video;
                    });
            } else {
                // initialise with defaults
                vm.video = {
                    publishDate: moment().format('YYYY-MM-DD'),
                    displayUrl : "test",
                    publish: true
                };
            }
        }

        function saveVideo() {
            VideoService.Save(vm.video)
                .then(function () {
                    AlertService.Success('Video saved', true);
                    $location.path('/videos');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }

        function deleteVideo() {
            VideoService.Delete(vm.video._id)
                .then(function () {
                    AlertService.Success('Video deleted', true);
                    $location.path('/videos');
                })
                .catch(function (error) {
                    AlertService.Error(error);
                });
        }
    }

})();
