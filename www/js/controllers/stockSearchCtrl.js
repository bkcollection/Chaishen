angular.module('Chaishen.controllers').controller('stockSearchCtrl', [
    '$scope', '$webServicesFactory', '$stockMarketProvider', '$state', '$ionicLoading', '$globalVarsFactory',
    function($scope, $webServicesFactory, $stockMarketProvider, $state, $ionicLoading, $globalVarsFactory) {
        $scope.searchQuery = {};

        function vaild(field) {
            if(typeof field === "undefined" || field == null || field === "")
                return false;
            else if (parseInt(field) === 0)
                return true;
            else
                return true;
        }

        $scope.openSearchList = function () {
            $ionicLoading.show();

            var parameters = {};

            parameters.name = ( vaild($scope.searchQuery.stockName)? $scope.searchQuery.stockName : "%" );
            parameters.vindexMin = ( vaild($scope.searchQuery.vindexMin)? $scope.searchQuery.vindexMin : "_" );
            parameters.vindexMax = ( vaild($scope.searchQuery.vindexMax)? $scope.searchQuery.vindexMax : "_" );
            parameters.volumeMin = ( vaild($scope.searchQuery.volumeChangeMin)? $scope.searchQuery.volumeChangeMin : "_" );
            parameters.volumeMax = ( vaild($scope.searchQuery.volumeChangeMax)? $scope.searchQuery.volumeChangeMax : "_" );
            parameters.macd = $scope.searchQuery.stockMACD;
            parameters.stoch = $scope.searchQuery.stockSTOHASTIC;
            parameters.bollinger = $scope.searchQuery.stockBOLLINGER;
            parameters.rsi = $scope.searchQuery.stockRSI;
            parameters.atr = $scope.searchQuery.stockATR;
            parameters.trade = $scope.searchQuery.stockTRADE;





            console.info(parameters);
            var header = {AnonymousToken: $stockMarketProvider[$scope.searchQuery.stockMartket].token};

            $webServicesFactory.get($stockMarketProvider[$scope.searchQuery.stockMartket].queryURL+"/search_query", header, {parameters:parameters}).then(
                function success(data) {
                    $globalVarsFactory.stockSearchResult = data;
                    console.info(data);
                    $state.go('app.stockSearchList');
                    $ionicLoading.hide();
                },
                function error(e) {
                    $ionicLoading.hide();
                }
            );//end of get

        };
    }
]);