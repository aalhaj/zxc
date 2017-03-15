(function() {
  'use strict';

  angular
    .module('IngcoTools')
    .controller('CategoryController',CategoryController);
    CategoryController.$inject = ['$scope','$http'];

    function CategoryController($scope,$http){
      $scope.categories = [];
      $scope.tempCategoryData = {};
      // function to get records from the database
      $scope.getCategories = function(){
          $http.get('action.php', {
              params:{
                  'type':'view',
                  'table':'category'
              }
          }).success(function(response){
              if(response.status == 'OK'){
                  $scope.categories = response.records;
              }
          });
      };

      // function to insert or update category data to the database
      $scope.saveCategory = function(type){
          var data = $.param({
              'data':$scope.tempCategoryData,
              'type':type,
              'table':'category'
          });
          var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
              }
          };
          $http.post("action.php", data, config).success(function(response){
              if(response.status == 'OK'){
                  if(type == 'edit'){
                      $scope.categories[$scope.index].id = $scope.tempCategoryData.id;
                      $scope.categories[$scope.index].name_ar = $scope.tempCategoryData.name_ar;
                      $scope.categories[$scope.index].name_en = $scope.tempCategoryData.name_en;
                      $scope.categories[$scope.index].image = $scope.tempCategoryData.image;
                      $scope.categories[$scope.index].created = $scope.tempCategoryData.created;
                  }else{
                      $scope.categories.push({
                          id:response.data.id,
                          name_ar:response.data.name_ar,
                          name_en:response.data.name_en,
                          image:response.data.image,
                          created:response.data.created
                      });

                  }
                  $scope.categoryForm.$setPristine();
                  $scope.tempCategoryData = {};
                  $('.formData').slideUp();
                  $scope.messageSuccess(response.msg);
              }else{
                  $scope.messageError(response.msg);
              }
          });
      };

      // function to add cateory data
      $scope.addCategory = function(){
          $scope.saveCategory('add');
      };

      // function to edit category data
      $scope.editCategory = function(category){
          $scope.tempCategoryData = {
              id:category.id,
              name_ar:category.name_ar,
              name_en:category.name_en,
              image:category.image,
              created:category.created
          };
          $scope.index = $scope.categories.indexOf(category);
          $('.formData').slideDown();
      };

      // function to update category data
      $scope.updateCategory = function(){
          $scope.saveCategory('edit');
      };

      // function to delete category data from the database
      $scope.deleteCategory = function(category){
          var conf = confirm('Are you sure to delete the category?');
          if(conf === true){
              var data = $.param({
                  'id': category.id,
                  'type':'delete',
                  'table':'category'
              });
              var config = {
                  headers : {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                  }
              };
              $http.post("action.php",data,config).success(function(response){
                  if(response.status == 'OK'){
                      var index = $scope.categories.indexOf(category);
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
