angular.module('Chaishen.controllers').controller('LoginSignupCtrl', [
    '$scope', 'modalService', 'userService',
    function($scope, modalService, userService) {

        $scope.user = {email: '', password: ''};

        $scope.closeModal = function() {
            modalService.closeModal();
        };

        $scope.signup = function(user) {
            userService.signup(user);
        };

        $scope.login = function(user) {
            userService.login(user);
        };
    }
]);