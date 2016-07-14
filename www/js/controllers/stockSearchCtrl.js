angular.module('Chaishen.controllers').controller('stockSearchCtrl', [
    '$scope', '$state',
    function($scope, $state) {
        $scope.t="TEST";

        $scope.openSearchList = function () {
            $state.go('app.stockSearchList');
        };
    }
]);