angular.module('Chaishen.controllers').controller('stockSearchListCtrl', [
    '$scope', '$globalVarsFactory', '$colorCodeProvider', '$webServicesFactory',
    function($scope, $globalVarsFactory, $colorCodeProvider, $webServicesFactory) {
        $scope.stocks = $globalVarsFactory.stockSearchResult;
        $scope.parameters = $globalVarsFactory.stockSearchParameters;
        $scope.tmpSearchData = $globalVarsFactory.tmpSearchData;

        //coloring
        $scope.marketStateClass = function (marketState) {
            return($colorCodeProvider[marketState]);
        };

        //load more stocks
        $scope.loadMore = function () {
            $scope.parameters.offSet += $scope.parameters.limit;

            $webServicesFactory.get($scope.tmpSearchData.url, $scope.tmpSearchData.header, {parameters:$scope.parameters}).then(
                function success(data) {
                    $scope.stocks.push.apply($scope.stocks, data);
                    if(data.length==0)
                        $scope.tmpSearchData.moreDataCanBeLoaded = false;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                },
                function error(e) {
                    $ionicLoading.hide();
                }
            );//end of get


        };




        $scope.passStockToDetail = function (stockID, stockMarket) {
            $globalVarsFactory.stockID = stockID;
            $globalVarsFactory.stockMarket = stockMarket;
        };
        
    }
]);