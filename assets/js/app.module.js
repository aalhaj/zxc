(function(){
  'use strict';

  angular
      .module('ingcoTools')
      .config(function config($stateProvider, $urlRouterProvider,$locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
          .state('/',{
            url: '/',
            controller: 'mainController',
            data : { pageTitle: 'Home' },
            views: {
              'content_1': {
                  templateUrl: 'views/home_categories.html',
                  controller: ''
              }
            }
          })
          .state('/home',{
            url: '/home',
            controller: 'mainController',
            data : { pageTitle: 'Home' },
            views: {
              'content_1': {
                  templateUrl: 'views/home_categories.html',
                  controller: ''
              }
            }
          })
          .state('/contact',{
            url: '/contact',
            controller: 'mainController',
            data : { pageTitle: 'Contact Us' },
            views: {
              'content_1': {
                  templateUrl: 'views/contact.html',
                  controller: ''
              },
              'custom_resources':{
                templateUrl: 'views/contact_resources.html',
              }
            }
          })
          .state('otherwise',{
            url: '*path',
            controller: 'mainController',
            data : { pageTitle: 'Error 404' },
            views: {
              'content_1': {
                  templateUrl: 'views/404.html',
              }
            }
          });


      });


})();
