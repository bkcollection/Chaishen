angular.module('Chaishen.controllers').controller('stockScreenerCtrl', [
    '$scope', '$webServicesFactory', '$ionicLoading', '$globalVarsFactory', '$ionicModal', '$stockMarketProvider','$colorCodeProvider', '$ionicSlideBoxDelegate',
    function ($scope, $webServicesFactory, $ionicLoading, $globalVarsFactory, $ionicModal, $stockMarketProvider, $colorCodeProvider, $ionicSlideBoxDelegate) {

        $scope.currentTop = "buy";

        //set url based on the drop down list option
        $scope.selectedMarketChange = function (selectedMarket) {
            $scope.loadStocks($stockMarketProvider[selectedMarket].topGetURL, {AnonymousToken: $stockMarketProvider[selectedMarket].token});
        };

        //get stocks from url
        $scope.loadStocks = function (url, headers) {
            $ionicLoading.show();
            $webServicesFactory.get(url, headers, {}).then(
                function success(data) {
                    $scope.buyStocks = data.data.splice(0, 10);//first 10 is buy
                    $scope.sellStocks = data.data;//second 10 is sell

                    $ionicLoading.hide();
                },
                function error(err) {
                    $ionicLoading.hide();
                }
            );//end of load stocks
        };

        //coloring
        $scope.marketStateClass = function (marketState) {
            return($colorCodeProvider[marketState]);
        };

        //send stock to detail page
        $scope.passStockToDetail = function (stockID, stockMarket) {
            $globalVarsFactory.stockID = stockID;
            $globalVarsFactory.stockMarket = stockMarket;
        };

        $scope.slideChanged = function (index) {
            if(index == 0)
                $scope.currentTop = "buy";
            else
                $scope.currentTop = "sell";
        };

        $scope.clickTest = function(){
        };

    }
]);