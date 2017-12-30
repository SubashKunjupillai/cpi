(function () {
    'use strict';

    angular
        .module('app')
        .factory('VideoService', Service);

    function Service(DataService) {
        var service = DataService('/api/videos');
        return service;
    }
})();
