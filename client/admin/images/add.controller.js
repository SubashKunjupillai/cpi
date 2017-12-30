(function () {
    'use strict';

    angular
        .module('app')
        .controller('Images.AddController', Controller);

        angular.module("app").directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
              },
              link: function (scope, element, attributes) {
                  element.bind("change", function (changeEvent) {
                      scope.$apply(function () {
                          // scope.fileread = changeEvent.target.files[0];
                          // or all selected files:
                          console.log("Files : " + changeEvent.target.files);
                          scope.fileread = changeEvent.target.files;
                      });
                  });
              }
            }
    }]);;

    function Controller($stateParams, $location, ImageService, AlertService) {
        var vm = this;
        vm.images = {};
        vm.saveImages = saveImages;

        initController();

        function initController() {
            vm.loading = 0;
            vm.images = {
                    publishDate: moment().format('YYYY-MM-DD'),
                    publish: true
            };
        }

        function saveImages() {

          for (var i=0; i<vm.images.length; i++){
            console.log(vm.images[i]);
          }
          var images = [];
          for (var i=0; i<vm.images.length; i++){
            var image ={
              publishDate : vm.images.publishDate,
              publish : vm.images.publish,
              name : vm.images[i].name
            };
            images.push(image);
          }


          ImageService.Save(images)
              .then(function () {
                  AlertService.Success('Images saved', true);
                  $location.path('/images');
              })
              .catch(function (error) {
                  AlertService.Error(error);
              });
        }
    }

})();
