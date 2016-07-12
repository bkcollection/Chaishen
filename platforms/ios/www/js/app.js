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
