(function(){
  'use strict';

  angular
    .module('BooksReviews')
    .service('categoriesService',categoriesService);

    categoriesService.$inject = ['$http','$q'];

  function categoriesService($http,$q) {
     var deff = $q.defer();
     $http.get('data/categories.json').then(function (data) {
       deff.resolve(data);
     });

     this.getBooksCategories = function(){
       return deff.promise;
     }
   }

})();
