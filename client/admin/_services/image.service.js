(function () {
    'use strict';

    angular
        .module('app')
        .factory('ImageService', Service);

    function Service(DataService) {
        var service = DataService('/api/images');
        return service;
    }
})();
