(function() {
  'use strict';

  angular
    .module('IngcoTools')
    .controller('ProductController',ProductController);
    ProductController.$inject = ['$scope','$http'];

    function ProductController($scope,$http){
      $scope.categories = [];
      $scope.tempProductData = {};
      // function to get records from the database
      $scope.getProducts = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'product'
              }
          }).success(function(response){
              if(response.status == 'OK'){
                  $scope.products = response.records;
              }
          });
      };

      // function to insert or update product data to the database
      $scope.saveProduct = function(type){
          var data = $.param({
              'data':$scope.tempProductData,
              'type':type,
              'table':'product'
          });
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).success(function(response){
              if(response.status == 'OK'){
                  if(type == 'edit'){
                      $scope.products[$scope.index].id = $scope.tempProductData.id;
                      $scope.products[$scope.index].category = $scope.tempProductData.category;
                      $scope.products[$scope.index].name_ar = $scope.tempProductData.name_ar;
                      $scope.products[$scope.index].name_en = $scope.tempProductData.name_en;
                      $scope.products[$scope.index].description_ar = $scope.tempProductData.description_ar;
                      $scope.products[$scope.index].description_en = $scope.tempProductData.description_en;
                      $scope.products[$scope.index].product_num = $scope.tempProductData.product_num;
                      $scope.products[$scope.index].patent_num = $scope.tempProductData.patent_num;
                      $scope.products[$scope.index].created = $scope.tempProductData.created;
                  }else{
                      $scope.categories.push({
                          id:response.data.id,
                          category:response.data.category,
                          name_ar:response.data.name_ar,
                          name_en:response.data.name_en,
                          description_ar:response.data.description_ar,
                          description_en:response.data.description_en,
                          product_num:response.data.product_num,
                          patent_num:response.data.patent_num,
                          created:response.data.created
                      });

                  }
                  $scope.productForm.$setPristine();
                  $scope.tempProductData = {};
                  $('.formData').slideUp();
                  $scope.messageSuccess(response.msg);
              }else{
                  $scope.messageError(response.msg);
              }
          });
      };

      // function to add cateory data
      $scope.addProduct = function(){
          $scope.saveProduct('add');
      };

      // function to edit product data
      $scope.editProduct = function(product){
          $scope.tempProductData = {
              id:product.id,
              category:product.category,
              name_ar:product.name_ar,
              name_en:product.name_en,
              description_ar:product.description_ar,
              description_en:product.description_en,
              product_num:product.product_num,
              patent_num:product.patent_num,
              created:product.created
          };
          $scope.index = $scope.products.indexOf(product);
          $('.formData').slideDown();
      };

      // function to update product data
      $scope.updateProduct = function(){
          $scope.saveProduct('edit');
      };

      // function to delete product data from the database
      $scope.deleteProduct = function(product){
          var conf = confirm('Are you sure to delete the product?');
          if(conf === true){
              var data = $.param({
                  'id': product.id,
                  'type':'delete',
                  'table':'product'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("controller/action.php",data,config).success(function(response){
                  if(response.status == 'OK'){
                      var index = $scope.categories.indexOf(product);
                      $scope.categories.splice(index,1);
                      $scope.messageSuccess(response.msg);
                  }else{
                      $scope.messageError(response.msg);
                  }
              });
          }
      };

      // function to display success message
      $scope.messageSuccess = function(msg){
          $('.alert-success > p').html(msg);
          $('.alert-success').show();
          $('.alert-success').delay(5000).slideUp(function(){
              $('.alert-success > p').html('');
          });
      };

      // function to display error message
      $scope.messageError = function(msg){
          $('.alert-danger > p').html(msg);
          $('.alert-danger').show();
          $('.alert-danger').delay(5000).slideUp(function(){
              $('.alert-danger > p').html('');
          });
      };
    }
})();
