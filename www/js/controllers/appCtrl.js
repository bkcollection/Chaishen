angular.module('Chaishen.controllers').controller('AppCtrl', [
    '$scope', 'modalService', 'userService',
    function($scope, modalService, userService) {

        $scope.modalService = modalService;

        $scope.logout = function() {
            userService.logout();
        };

    }
]);