angular.module('Chaishen.controllers').controller('SearchCtrl', [
    '$scope', '$state', 'modalService', 'searchService',
    function($scope, $state, modalService, searchService) {

        $scope.closeModal = function() {
            modalService.closeModal();
        };

        $scope.search = function() {
            $scope.searchResults = '';
            startSearch($scope.searchQuery);
        };

        var startSearch = ionic.debounce(function(query) {
            searchService.search(query)
                .then(function(data) {
                    $scope.searchResults = data;
                });
        }, 400);

        $scope.goToStock = function(ticker) {
            modalService.closeModal();
            $state.go('app.stock', {stockTicker: ticker});
        };
    }]
);