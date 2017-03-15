(function(){
  'use strict';

  angular
    .module('BooksReviews')
    .service('booksService',booksService);

    booksService.$inject = ['$http','$q'];

  function booksService($http,$q) {
     var deff = $q.defer();
     $http.get('data/books.json').then(function (data) {
       deff.resolve(data);
     });

     this.getBooks = function(){
       return deff.promise;
     }
   }

})();
