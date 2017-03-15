(function(){
  'use strict';

  angular
    .module('BooksReviews')
    .controller('CategoriesController',CategoriesController);
    CategoriesController.$inject = ['categoriesService'];

    function CategoriesController(categoriesService,$route){

    }

})();
