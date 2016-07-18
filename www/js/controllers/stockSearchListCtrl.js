angular.module('Chaishen.controllers').controller('stockSearchListCtrl', [
    '$scope', '$globalVarsFactory', '$colorCodeProvider',
    function($scope, $globalVarsFactory, $colorCodeProvider) {
        $scope.stocks = $globalVarsFactory.stockSearchResult;

        //coloring
        $scope.marketStateClass = function (marketState) {
            return($colorCodeProvider[marketState]);
        };

        $scope.passStockToDetail = function (stockID, stockMarket) {
            $globalVarsFactory.stockID = stockID;
            $globalVarsFactory.stockMarket = stockMarket;
        };
        
    }
]);