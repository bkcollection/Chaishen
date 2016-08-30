angular.module('Chaishen.controllers').controller('StockCtrl', [
    '$scope', '$stateParams', '$window', '$ionicPopup', '$cordovaInAppBrowser', 'followStockService', 'stockDataService', 'chartDataService', 'dateService', 'notesService', 'newsService', '$ionicLoading', '$admobFactory',
    function($scope, $stateParams, $window, $ionicPopup, $cordovaInAppBrowser, followStockService, stockDataService, chartDataService, dateService, notesService, newsService, $ionicLoading, $admobFactory) {

        $admobFactory.closeBanner();


















        $scope.chartData = [];








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
        $scope.$on("$ionicView.afterEnter", function() {
            getPriceData();
            getDetailsData();
            getChartData();
            getNews();
            $scope.stockNotes = notesService.getNotes($scope.ticker);
        });


        $scope.chartViewFunc = function(n) {
            $scope.chartView = n;
            if(n == 4){


                createYearChart();


                var chart;

                function createYearChart() {
                    chart = new AmCharts.AmStockChart();
                    chart.dataDateFormat = "YYYY-MM-DD";


                    // DATASETS //////////////////////////////////////////
                    var dataSet = new AmCharts.DataSet();
                    dataSet.color = "#2c5cb4";
                    dataSet.fieldMappings = [{
                        fromField: "price",
                        toField: "price"
                    }, {
                        fromField: "volume",
                        toField: "volume"
                    }];
                    dataSet.dataProvider = $scope.chartData;
                    dataSet.categoryField = "date";

                    // set data sets to the chart
                    chart.dataSets = [dataSet];

                    // PANELS ///////////////////////////////////////////
                    // first stock panel
                    var stockPanel1 = new AmCharts.StockPanel();
                    stockPanel1.showCategoryAxis = false;
                    stockPanel1.title = "Price";
                    stockPanel1.percentHeight = 70;

                    // graph of first stock panel
                    var graph1 = new AmCharts.StockGraph();
                    graph1.type = "line";
                    graph1.valueField = "price";
                    stockPanel1.addStockGraph(graph1);

                    // create stock legend
                    var stockLegend1 = new AmCharts.StockLegend();
                    stockLegend1.valueTextRegular = " ";
                    stockLegend1.markerType = "none";
                    stockPanel1.stockLegend = stockLegend1;



                    // second stock panel
                    var stockPanel2 = new AmCharts.StockPanel();
                    stockPanel2.title = "Volume";
                    stockPanel2.percentHeight = 30;
                    var graph2 = new AmCharts.StockGraph();
                    graph2.valueField = "volume";
                    graph2.type = "column";
                    graph2.fillAlphas = 1;
                    stockPanel2.addStockGraph(graph2);

                    // create stock legend
                    var stockLegend2 = new AmCharts.StockLegend();
                    stockLegend2.valueTextRegular = " ";
                    stockLegend2.markerType = "none";
                    stockPanel2.stockLegend = stockLegend2;

                    // set panels to the chart
                    chart.panels = [stockPanel1, stockPanel2];


                    // OTHER SETTINGS ////////////////////////////////////
                    var scrollbarSettings = new AmCharts.ChartScrollbarSettings();
                    scrollbarSettings.graph = graph1;
                    scrollbarSettings.graphType = "line";
                    scrollbarSettings.updateOnReleaseOnly = false;
                    chart.chartScrollbarSettings = scrollbarSettings;


                    var cursorSettings = new AmCharts.ChartCursorSettings();
                    cursorSettings.valueBalloonsEnabled = true;
                    cursorSettings.graphBulletSize = 1;
                    chart.chartCursorSettings = cursorSettings;


                    // PERIOD SELECTOR ///////////////////////////////////
                    var periodSelector = new AmCharts.PeriodSelector();
                    periodSelector.periods =
                        [{
                            period: "DD",
                            count: 7,
                            label: "1 week"
                        },
                            {
                                period: "MM",
                                count: 1,
                                label: "1 month"
                            },
                            {
                                selected: true,
                                period: "MAX",
                                label: "Full year"
                            }];
                    periodSelector.inputFieldsEnabled = false;
                    chart.periodSelector = periodSelector;


                    var panelsSettings = new AmCharts.PanelsSettings();
                    panelsSettings.marginRight = 16;
                    panelsSettings.marginLeft = 16;
                    panelsSettings.usePrefixes = true;
                    chart.panelsSettings = panelsSettings;

                    chart.write('yearChart');
                }


            }
            else if(n == 6){



                createStockChart();

                function createStockChart() {
                    var chart;
                    var stockPanel;
                    chart = new AmCharts.AmStockChart();

                    chart.balloon.horizontalPadding = 13;
                    chart.dataDateFormat = "YYYY-MM-DD";

                    // DATASET //////////////////////////////////////////
                    var dataSet = new AmCharts.DataSet();
                    dataSet.fieldMappings = [{
                        fromField: "open",
                        toField: "open"
                    }, {
                        fromField: "close",
                        toField: "close"
                    }, {
                        fromField: "high",
                        toField: "high"
                    }, {
                        fromField: "low",
                        toField: "low"
                    }, {
                        fromField: "volume",
                        toField: "volume"
                    }, {
                        fromField: "value",
                        toField: "value"
                    }];
                    dataSet.color = "#7f8da9";
                    dataSet.dataProvider = $scope.chartData;
                    dataSet.categoryField = "date";

                    chart.dataSets = [dataSet];

                    // PANELS ///////////////////////////////////////////
                    stockPanel = new AmCharts.StockPanel();
                    stockPanel.title = "Value";

                    // graph of first stock panel
                    var graph = new AmCharts.StockGraph();
                    graph.type = "candlestick";
                    graph.openField = "open";
                    graph.closeField = "close";
                    graph.highField = "high";
                    graph.lowField = "low";
                    graph.valueField = "close";
                    graph.lineColor = "#7f8da9";
                    graph.fillColors = "#7f8da9";
                    graph.negativeLineColor = "#db4c3c";
                    graph.negativeFillColors = "#db4c3c";
                    graph.fillAlphas = 1;
                    graph.balloonText = "open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>";
                    graph.useDataSetColors = false;
                    stockPanel.addStockGraph(graph);

                    var stockLegend = new AmCharts.StockLegend();
                    stockLegend.markerType = "none";
                    stockLegend.markerSize = 0;
                    stockLegend.valueTextRegular = undefined;
                    stockLegend.valueWidth = 250;
                    stockPanel.stockLegend = stockLegend;
                    
                    // second stock panel
                    var stockPanel2 = new AmCharts.StockPanel();
                    stockPanel2.title = "Volume";
                    stockPanel2.percentHeight = 30;
                    var graph2 = new AmCharts.StockGraph();
                    graph2.valueField = "volume";
                    graph2.type = "column";
                    graph2.fillAlphas = 1;
                    stockPanel2.addStockGraph(graph2);

                    // create stock legend
                    var stockLegend2 = new AmCharts.StockLegend();
                    stockLegend2.valueTextRegular = " ";
                    stockLegend2.markerType = "none";
                    stockPanel2.stockLegend = stockLegend2;

                    // set panels to the chart
                    chart.panels = [stockPanel, stockPanel2];
                    

                    // OTHER SETTINGS ////////////////////////////////////
                    var sbsettings = new AmCharts.ChartScrollbarSettings();
                    sbsettings.graph = graph;
                    sbsettings.graphType = "line";
                    sbsettings.usePeriod = "WW";
                    chart.chartScrollbarSettings = sbsettings;

                    var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
                    categoryAxesSettings.equalSpacing = true;
                    chart.categoryAxesSettings = categoryAxesSettings;

                    // Enable pan events
                    var panelsSettings = new AmCharts.PanelsSettings();
                    panelsSettings.panEventsEnabled = true;
                    chart.panelsSettings = panelsSettings;

                    // CURSOR
                    var cursorSettings = new AmCharts.ChartCursorSettings();
                    cursorSettings.valueBalloonsEnabled = true;
                    cursorSettings.fullWidth = true;
                    cursorSettings.cursorAlpha = 0.1;
                    chart.chartCursorSettings = cursorSettings;

                    // PERIOD SELECTOR ///////////////////////////////////
                    var periodSelector = new AmCharts.PeriodSelector();
                    periodSelector.position = "bottom";
                    periodSelector.periods =
                        [{
                            period: "DD",
                            count: 7,
                            label: "1 week"
                        },
                        {
                            period: "MM",
                            count: 1,
                            label: "1 month"
                        },
                        {
                            selected: true,
                            period: "MAX",
                            label: "Full year"
                        }];
                    periodSelector.inputFieldsEnabled = false;
                    chart.periodSelector = periodSelector;


                    chart.write('candleChart');
                }

            }
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

                $scope.chartData = data;
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




    }
]);