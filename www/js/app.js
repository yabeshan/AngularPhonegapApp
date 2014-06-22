var appGap = angular.module('ionicApp', ['ionic']);

appGap.run(function($ionicPlatform, $state) {

    $state.go('home');

    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

appGap.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "js/view/menuPanel.html",
            controller: 'MenuCtrl'
        })

        .state('app.map', {
            url: "/map",
            views: {
                'menuContent' :{
                    templateUrl: "js/view/mapPage.html",
                    controller: 'MapCtrl'
                }
            }
        })

        .state('home', {
            url: "/home",
            templateUrl: "js/view/homePage.html",
            controller: 'HomeCtrl'
        })

        .state('about', {
            url: "/about",
            templateUrl: "js/view/aboutPage.html",
            controller: 'AboutPageCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

});

//function onDeviceReady() {
//    angular.bootstrap(document, ["ionicApp"]);
//};
//
//document.addEventListener('deviceready', this.onDeviceReady, false);
//setTimeout(function(){
//    if(document.URL.indexOf('file:///D:/Nick')==0) {
//
//    };
//},1000);
