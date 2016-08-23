angular.module('Chaishen.controllers').controller('stockScreenerDetailsCtrl', [
    '$scope', '$globalVarsFactory',  '$webServicesFactory', '$ionicLoading', '$watcherFactory', '$stockMarketProvider', '$colorCodeProvider',
    function ($scope, $globalVarsFactory, $webServicesFactory, $ionicLoading, $watcherFactory, $stockMarketProvider, $colorCodeProvider) {


        $ionicLoading.show();

        //get stock data
        $webServicesFactory.get($stockMarketProvider[$globalVarsFactory.stockMarket].getURL+"/"+$globalVarsFactory.stockID+"?exclude=metadata", {AnonymousToken: $stockMarketProvider[$globalVarsFactory.stockMarket].token}, {}).then(
            function success(data) {
                $scope.stock = data;

                $ionicLoading.hide();
            },
            function error(error) {
                $ionicLoading.hide();
            }
        );

        //coloring
        $scope.marketStateClass = function (state) {
            return($colorCodeProvider[state]);
        };

        //to show/hide follow ctrls
        $scope.checkWatchState = function () {
            return($watcherFactory.isInWatchList($globalVarsFactory.stockID, $globalVarsFactory.stockMarket));
        };
        $scope.toggleWatchState = function () {
            var state = $watcherFactory.isInWatchList($globalVarsFactory.stockID, $globalVarsFactory.stockMarket);

            if(state){//remove
                $watcherFactory.removeFromWatchList($globalVarsFactory.stockID, $globalVarsFactory.stockMarket);
            }
            else //add
                $watcherFactory.addToWatchList($globalVarsFactory.stockID, $globalVarsFactory.stockMarket);
        };
    }
]);