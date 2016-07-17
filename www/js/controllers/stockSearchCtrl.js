angular.module('Chaishen.controllers').controller('stockSearchCtrl', [
    '$scope', '$webServicesFactory', '$stockMarketProvider', '$state',
    function($scope, $webServicesFactory, $stockMarketProvider, $state) {
        $scope.searchQuery = {};

        function vaild(field) {
            return(field != "" && !(typeof field === "undefined") && field != null)
        }

        $scope.openSearchList = function () {
            //alert($scope.searchQuery.stockName);//
            //alert($scope.searchQuery.stockMartket);
            //alert($scope.searchQuery.vindexMin);//
            //alert($scope.searchQuery.vindexMax);//
            //alert($scope.searchQuery.volumeChangeMin);//
            //alert($scope.searchQuery.volumeChangeMax);//
            //alert($scope.searchQuery.stockMACD);
            //alert($scope.searchQuery.stockSTOHASTIC);
            //alert($scope.searchQuery.stockBOLLINGER);
            //alert($scope.searchQuery.stockATR);
            //alert($scope.searchQuery.stockTRADE);
            var filterFields = [];
            if( vaild($scope.searchQuery.stockName) )
                filterFields.push({"fieldName": "Stock", "operator": "startsWith", "value": $scope.searchQuery.stockName});
            if( vaild($scope.searchQuery.vindexMin) )
                filterFields.push({"fieldName": "Vindex", "operator": "greaterThan", "value": $scope.searchQuery.vindexMin});
            if( vaild($scope.searchQuery.vindexMax) )
                filterFields.push({"fieldName": "Vindex", "operator": "lessThan", "value": $scope.searchQuery.vindexMax});
            if( vaild($scope.searchQuery.volumeChangeMin) )
                filterFields.push({"fieldName": "Volume_changes_pc", "operator": "greaterThan", "value": $scope.searchQuery.volumeChangeMin});
            if( vaild($scope.searchQuery.volumeChangeMax) )
                filterFields.push({"fieldName": "Volume_changes_pc", "operator": "lessThan", "value": $scope.searchQuery.volumeChangeMax});

            console.info(filterFields);
            var header = {AnonymousToken: $stockMarketProvider[$scope.searchQuery.stockMartket].token};
            $webServicesFactory.get($stockMarketProvider[$scope.searchQuery.stockMartket].getURL, header, {filter: filterFields, exclude:'metadata'}).then(
                function success(data) {
                    console.info(data);
                }
            );

            //$state.go('app.stockSearchList');
        };
    }
]);