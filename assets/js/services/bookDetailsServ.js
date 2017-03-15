(function(){
  'use strict';

  angular
    .module('BooksReviews')
    .service('bookDetailsService',bookDetailsService);

    bookDetailsService.$inject = ['$http','$q'];

  function bookDetailsService($http,$q) {
     var deff = $q.defer();

     this.getBookDetails = function(id){
       $http.get('data/books/book'+id+'.json').then(function (data) {
         deff.resolve(data);
       });
       return deff.promise;
     }
   }

})();
