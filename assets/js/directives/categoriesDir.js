(function(){
  'use strict';
  angular
    .module('BooksReviews')
    .directive('categoriesDirective',categoriesDirective);

     function categoriesDirective(){
       return {
         restrict: 'EA',
         templateUrl:'templates/categoryTemp.html',
         scope: {
           category: '='
         }
       };
     }
})();
