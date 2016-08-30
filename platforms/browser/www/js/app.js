angular.module('Chaishen', [
  'ionic',
  'firebase',
  'angular-cache',
  'ngCordova',
  'nvChart',
  'cb.x2js',
  'Chaishen.controllers',
  'Chaishen.services',
  'Chaishen.filters',
  'Chaishen.directives'
])
    .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
      //starts ad mob service
      //admob.initAdmob("ca-app-pub-0432229319031959/5730509464","ca-app-pub-0432229319031959/1051240263");
      
      var admobid = {
          banner: 'ca-app-pub-0432229319031959/5730509464', // or DFP format "/6253334/dfp_example_ad"
          interstitial: 'ca-app-pub-0432229319031959/1051240263'
      };
      



    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleHex("#FFFFFF");//styleHex not a function
    }
  });
})
    //
    // setting http headers - Ibrahim
    .constant('$httpHeadersProvider' , {
      Accept: 'application/json; charset=UTF-8'
    })
    .constant('$stockMarketProvider' , {
        malaysia: {
            topGetURL: "https://api.backand.com/1/objects/KLSEbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/KLSE",
            queryURL:"https://api.backand.com/1/query/data",
            token: "f15e7233-6945-4845-b421-26e017fabe2b"
        },
        nasdaq: {
            topGetURL: "https://api.backand.com/1/objects/NASDAQbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/NASDAQ",
            queryURL:"https://api.backand.com/1/query/data",
            token: "1605dc7b-3afd-44a7-9233-509d4e64925c"
        },
        nyse: {
            topGetURL: "https://api.backand.com/1/objects/NYSEbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/NYSE",
            queryURL:"https://api.backand.com/1/query/data",
            token: "d23c988d-aaaf-4570-94f1-dbf315db6c10"
        },
        lse: {
            topGetURL: "https://api.backand.com/1/objects/LSEbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/LSE",
            queryURL:"https://api.backand.com/1/query/data",
            token: "74ffec87-196f-45f9-9aa9-0d92a66d1345"
        },
        sgx: {
            topGetURL: "https://api.backand.com/1/objects/SGXbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/SGX",
            queryURL:"https://api.backand.com/1/query/data",
            token: "415edca7-b308-4871-b640-d7e2975e304c"
        },
        th: {
            topGetURL: "https://api.backand.com/1/objects/THbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/TH",
            queryURL:"https://api.backand.com/1/query/data",
            token: "585c17a7-832a-4a5b-a361-2d1423424800"
        },
        sto: {
            topGetURL: "https://api.backand.com/1/objects/STObuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/STO",
            queryURL:"https://api.backand.com/1/query/data",
            token: "1ed6e13b-8949-448f-9962-4305ee63d8bf"
        },
        idx: {
            topGetURL: "https://api.backand.com/1/objects/IDXbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/IDX",
            queryURL:"https://api.backand.com/1/query/data",
            token: "b7233b86-b279-4910-8f71-c1dbb25126cf"
        },
        asx: {
            topGetURL: "https://api.backand.com/1/objects/ASXbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/ASX",
            queryURL:"https://api.backand.com/1/query/data",
            token: "70585b1f-0308-4c9d-9e50-d3214e05670f"
        },
        nysemkt: {
            topGetURL: "https://api.backand.com/1/objects/NYSEMKTbuysell?exclude=metadata",
            getURL: "https://api.backand.com/1/objects/NYSE",
            queryURL:"https://api.backand.com/1/query/data",
            token: "039510d9-f9d1-4b8d-b0b8-22a1c4add9e9"
        }
    })
    .constant('$colorCodeProvider' , {
        'Super Bull': "infoGreen",
        'Bull': "infoGreen",
        'Little Bull': "infoGreen",
        'BUY': "infoGreen",
        'SB': "infoGreen",
        'B': "infoGreen",

        'Neutral':"infoOrange",
        'HOLD':"infoOrange",
        'H':"infoOrange",

        'Little Bear': "infoRed",
        'Bear': "infoRed",
        'Super Bear': "infoRed",
        'S': "infoRed",
        'SS': "infoRed",
        'SELL':"infoRed"
    })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, $httpHeadersProvider) {
      //
      //passing http constant headers
      $httpProvider.defaults.headers.common['Accept'] = $httpHeadersProvider.Accept;

      $stateProvider
          .state('app', {
          url: "/app",
          abstract: true,
          templateUrl: "templates/menu.html",
          controller: 'AppCtrl'
        })
          .state('app.myStocks', {
            url: "/my-stocks",
            views: {
              'menuContent': {
                templateUrl: "templates/my-stocks.html",
                controller: 'MyStocksCtrl'
              }
            }
          })
          .state('app.stockScreener', {
            url: "/stockScreener",
            views: {
              'menuContent': {
                templateUrl: "templates/stockScreener.html",
                controller: 'stockScreenerCtrl'
              }
            }
          })
          .state('app.stockScreenerDetails', {
            url: "/stockScreenerDetails",
            views: {
              'menuContent': {
                templateUrl: "templates/stockScreenerDetails.html",
                controller: 'stockScreenerDetailsCtrl'
              }
            }
          })
          .state('app.watchList', {
              url: "/watchList",
              views: {
                  'menuContent': {
                      templateUrl: "templates/watchList.html",
                      controller: 'watchListCtrl'
                  }
              }
          })
          .state('app.stockSearch', {
              url: "/stockSearch",
              views: {
                  'menuContent': {
                      templateUrl: "templates/stockSearch.html",
                      controller: 'stockSearchCtrl'
                  }
              }
          })
          .state('app.stockSearchList', {
              url: "/stockSearchList",
              views: {
                  'menuContent': {
                      templateUrl: "templates/stockSearchList.html",
                      controller: 'stockSearchListCtrl'
                  }
              }
          })
          .state('app.stock', {
            url: "/:stockTicker",
            views: {
              'menuContent': {
                templateUrl: "templates/stock.html",
                controller: 'StockCtrl'
              }
            }
          })
          ;

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/my-stocks');
});


angular.module('Chaishen.controllers', []);
