angular.module('Chaishen.controllers').controller('stockScreenerCtrl', [
    '$scope', '$webServicesFactory', '$ionicLoading', '$globalVarsFactory', '$ionicModal', '$stockMarketProvider','$colorCodeProvider',
    function ($scope, $webServicesFactory, $ionicLoading, $globalVarsFactory, $ionicModal, $stockMarketProvider, $colorCodeProvider) {


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

/////////////////////////Search modal

        $scope.openSearchModal = function () {
            $ionicModal.fromTemplateUrl('templates/vindexSearch.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.searchModal = modal;
                $scope.searchModal.searchStockName = "";
                $scope.searchedStocks = [];
                $scope.searchModal.show();
            });
        };

        $scope.closeSearchModal = function () {
            $scope.searchModal.hide();
        };

        //sets market to  search
        var searchMarket="";
        $scope.selectedMarketSearchChange = function (market) {
            searchMarket = market;
        };
        //
        //submits search
        $scope.searchStocks = function () {

            if($scope.searchModal.searchStockName != "") {
                var filterParameters = [
                    {
                        "fieldName": "stock",
                        "operator": "contains",
                        "value": $scope.searchModal.searchStockName
                    }
                ];
                $scope.loadSearchStocks($stockMarketProvider[searchMarket].getURL, {AnonymousToken: $stockMarketProvider[searchMarket].token}, {'filter': filterParameters});
            }
        };
        //
        //gets searched stocks
        $scope.loadSearchStocks = function (url, headers, params) {
            $ionicLoading.show();
            $scope.searchedStocks = [];

            $webServicesFactory.get(url, headers, params).then(
                function success(data) {
                    $scope.searchedStocks = data.data;

                    $ionicLoading.hide();
                },
                function error(err) {
                    $ionicLoading.hide();
                }
            );//end of stocks get
        };

        //to be edited when the market attribute is added
        $scope.passSearchStockToDetail = function (stockID, stockMarket) {
            $globalVarsFactory.stockID = stockID;
            $globalVarsFactory.stockMarket = stockMarket;
            $scope.searchModal.hide();
        };

    }
]);