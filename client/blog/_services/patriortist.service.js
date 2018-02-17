(function () {
    'use strict';

    angular
        .module('app')
        .factory('PatriortistService', Service);

    function Service($http, $q) {
        var service = {};

        service.Send = Send;

        return service;

        function Send(form) {
          console.log("send");
          return $http.post('/api/patriortist', form).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
