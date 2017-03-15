(function(){
  'use strict';

  angular
    .module('BooksReviews')
    .directive('booksDirective',booksDirective);

    function booksDirective(){
      return {
        restrict: 'EA',
        templateUrl:'templates/bookTemp.html',
        scope: {
          book: '='
        },
        link: function(scope, element) {
    			if(scope.$parent.$last) {
            var defaultOptions = {
              navigation: true,
              pagination: false,
              rewindNav : false,
              margin:20,
              navText:['<span class="glyphicon glyphicon-chevron-left"></span>','<span class="glyphicon glyphicon-chevron-right"></span>'],
              responsiveClass:true,
              responsive:{
                0:{items:1,nav:true},
                768:{items:3,nav:true},
                1024:{items:5,nav:true}
              }
    				};
    				$(element).parent().owlCarousel(defaultOptions);
    			}
    		}
      };
    }


})();
