angular.module('Chaishen.controllers').controller('MyStocksCtrl', [
    '$scope', 'myStocksArrayService', 'stockDataService', 'stockPriceCacheService', 'followStockService',
    function($scope, myStocksArrayService, stockDataService, stockPriceCacheService, followStockService) {

        $scope.$on("$ionicView.afterEnter", function() {
            $scope.getMyStocksData();
        });

        $scope.getMyStocksData = function() {

            myStocksArrayService.forEach(function(stock) {

                var promise = stockDataService.getPriceData(stock.ticker);

                $scope.myStocksData = [];

                promise.then(function(data) {
                    $scope.myStocksData.push(stockPriceCacheService.get(data.symbol));
                });
            });

            $scope.$broadcast('scroll.refreshComplete');
        };

        $scope.unfollowStock = function(ticker) {
            followStockService.unfollow(ticker);
            $scope.getMyStocksData();
        };
    }
]);