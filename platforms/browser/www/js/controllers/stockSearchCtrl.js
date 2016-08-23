angular.module('Chaishen.controllers').controller('stockSearchCtrl', [
    '$scope', '$state',
    function($scope, $state) {

        $scope.selectedMarketChange = function (selectedMarket) {
            
        };

        $scope.openSearchList = function () {

            //$state.go('app.stockSearchList');
        };
    }
]);