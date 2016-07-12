angular.module('Chaishen', [
  'ionic',
  'firebase',
  'angular-cache',
  'ngCordova',
  'nvd3',
  'nvChart',
  'cb.x2js',
  'Chaishen.controllers',
  'Chaishen.services',
  'Chaishen.filters',
  'Chaishen.directives'
])
    .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

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
            topGetURL: "https://api.backand.com:443/1/objects/KLSEbuysell?exclude=metadata",
            getURL: "https://api.backand.com:443/1/objects/KLSE",
            token: "8a9a114f-f851-4a3a-aae6-0aa0119c1acc"
        },
        nasdaq: {
            topGetURL: "https://api.backand.com:443/1/objects/NASDAQbuysell?exclude=metadata",
            getURL: "https://api.backand.com:443/1/objects/NASDAQ",
            token: "1605dc7b-3afd-44a7-9233-509d4e64925c"
        },
        nyse: {
            topGetURL: "nyse_top_10_get_url",
            getURL: "nyse_all_get_url",
            token: "nyse_anonymous_token"
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
        'SS': "infoRed"
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
          .state('app.stock', {
            url: "/:stockTicker",
            views: {
              'menuContent': {
                templateUrl: "templates/stock.html",
                controller: 'StockCtrl'
              }
            }
          });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/my-stocks');
});
