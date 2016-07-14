angular.module('Chaishen.controllers').controller('watchListCtrl', [
    '$scope', '$watcherFactory', '$webServicesFactory', '$ionicLoading', '$stockMarketProvider', '$globalVarsFactory',
    function ($scope, $watcherFactory, $webServicesFactory, $ionicLoading, $stockMarketProvider, $globalVarsFactory) {

        $scope.$on("$ionicView.afterEnter", function(event, data) {

            $scope.watchedStocks = [];

            //get saved watched stocks
            var tList = $watcherFactory.getWatchList();
            //loop through it to get it from server
            for (var stock in tList) {
                $ionicLoading.show();
                if(tList[stock] != null) {

                    $webServicesFactory.get($stockMarketProvider[tList[stock].market].getURL+"/"+$globalVarsFactory.stockID+"?exclude=metadata", {AnonymousToken: $stockMarketProvider[tList[stock].market].token}, {}).then(
                        function success(data) {
                            $scope.watchedStocks.push(data);
                            $ionicLoading.hide();
                        },
                        function error() {
                            $ionicLoading.hide();
                        }
                    );

                }
                else
                    $ionicLoading.hide();
            }//end of for each loop

        });

        //
        //send stock to detail page
        $scope.passStockToDetail = function (stockID, stockMarket) {
            $globalVarsFactory.stockID = stockID;
            $globalVarsFactory.stockMarket = stockMarket;
        };


    }
]);