angular.module('Chaishen.controllers').controller('StockCtrl', [
    '$scope', '$stateParams', '$window', '$ionicPopup', '$cordovaInAppBrowser', 'followStockService', 'stockDataService', 'chartDataService', 'dateService', 'notesService', 'newsService', '$ionicLoading',
    function($scope, $stateParams, $window, $ionicPopup, $cordovaInAppBrowser, followStockService, stockDataService, chartDataService, dateService, notesService, newsService, $ionicLoading) {














        $scope.candleData = [];


        $scope.yearData = [];








        $scope.openLink = function (url) {
            window.open(url, "_system", "location=yes");
        };

        $scope.ticker = $stateParams.stockTicker;
        $scope.stockNotes = [];

        $scope.following = followStockService.checkFollowing($scope.ticker);
        $scope.oneYearAgoDate = dateService.oneYearAgoDate();
        $scope.todayDate = dateService.currentDate();

        // default chart setting
        $scope.chartView = 1;


        $scope.$on("$ionicView.afterEnter", function() {
            getPriceData();
            getDetailsData();
            getChartData();
            getNews();
            $scope.stockNotes = notesService.getNotes($scope.ticker);
        });


        $scope.chartViewFunc = function(n) {
            $scope.chartView = n;
        };

        $scope.toggleFollow = function() {
            if($scope.following) {
                followStockService.unfollow($scope.ticker);
                $scope.following = false;
            }
            else {
                followStockService.follow($scope.ticker);
                $scope.following = true;
            }
        };

        $scope.openWindow = function(link) {
            var inAppBrowserOptions = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'yes'
            };

            $cordovaInAppBrowser.open(link, '_blank', inAppBrowserOptions);
        };

        $scope.addNote = function() {
            $scope.note = {title: 'Note', body: '', date: $scope.todayDate, ticker: $scope.ticker};

            var note = $ionicPopup.show({
                template: '<input type="text" ng-model="note.title" id="stock-note-title"><textarea type="text" ng-model="note.body" id="stock-note-body"></textarea>',
                title: 'New Note for ' + $scope.ticker,
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel',
                        onTap: function(e) {
                            return;
                        }
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-balanced',
                        onTap: function(e) {
                            notesService.addNote($scope.ticker, $scope.note);
                        }
                    }
                ]
            });

            note.then(function(res) {
                $scope.stockNotes = notesService.getNotes($scope.ticker);
            });
        };

        $scope.openNote = function(index, title, body) {
            $scope.note = {title: title, body: body, date: $scope.todayDate, ticker: $scope.ticker};

            var note = $ionicPopup.show({
                template: '<input type="text" ng-model="note.title" id="stock-note-title"><textarea type="text" ng-model="note.body" id="stock-note-body"></textarea>',
                title: $scope.note.title,
                scope: $scope,
                buttons: [
                    {
                        text: 'Delete',
                        type: 'button-assertive button-small',
                        onTap: function(e) {
                            notesService.deleteNote($scope.ticker, index);
                        }
                    },
                    {
                        text: 'Cancel',
                        type: 'button-small',
                        onTap: function(e) {
                            return;
                        }
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-balanced button-small',
                        onTap: function(e) {
                            notesService.deleteNote($scope.ticker, index);
                            notesService.addNote($scope.ticker, $scope.note);
                        }
                    }
                ]
            });

            note.then(function(res) {
                $scope.stockNotes = notesService.getNotes($scope.ticker);
            });
        };


        function getPriceData() {

            var promise = stockDataService.getPriceData($scope.ticker);

            promise.then(function(data) {
                $scope.stockPriceData = data;

                if(data.chg_percent >= 0 && data !== null) {
                    $scope.reactiveColor = {'background-color': '#33cd5f', 'border-color': 'rgba(255,255,255,.3)'};
                }
                else if(data.chg_percent < 0 && data !== null) {
                    $scope.reactiveColor = {'background-color' : '#ef473a', 'border-color': 'rgba(0,0,0,.2)'};
                }
            });
        }

        function getDetailsData() {

            var promise = stockDataService.getDetailsData($scope.ticker);

            promise.then(function(data) {
                $scope.stockDetailsData = data;
            });
        }

        function getChartData() {
            $ionicLoading.show();

            var promise = chartDataService.getHistoricalData($scope.ticker, $scope.oneYearAgoDate, $scope.todayDate);

            promise.then(function(data) {

                console.info(data);
                $scope.yearData = [data[1]];
                $scope.candleData = [data[2]];
                $ionicLoading.hide();

            });
        }

        function getNews() {

            $scope.newsStories = [];

            var promise = newsService.getNews($scope.ticker);

            promise.then(function(data) {
                $scope.newsStories = data;
            });
        }




        $scope.yearOptions = {
            chart: {
                type: 'stackedAreaChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 10,
                    bottom: 30,
                    left: 40
                },
                x: function(d){return d[0];},
                y: function(d){return d[1];},
                useVoronoi: false,
                clipEdge: true,
                duration: 100,
                useInteractiveGuideline: true,
                xAxis: {
                    showMaxMin: false,
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(d))
                    },
                    staggerLabels: true
                },
                yAxis: {
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 10],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        $scope.candleOptions = {
            chart: {
                type: 'candlestickBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 10,
                    bottom: 40,
                    left: 60
                },
                x: function(d){ return d['date']; },
                y: function(d){ return d['close']; },
                duration: 100,

                xAxis: {
                    axisLabel: 'Dates',
                    tickFormat: function(d) {
                        return d3.time.format('%x')(new Date(new Date() - (20000 * 86400000) + (d * 86400000)));
                    },
                    showMaxMin: false
                },

                yAxis: {
                    axisLabel: 'Stock Price',
                    tickFormat: function(d){
                        return '$' + d3.format(',.1f')(d);
                    },
                    showMaxMin: false
                },
                zoom: {
                    enabled: true,
                    scaleExtent: [1, 40],
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: true,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };



    }
]);