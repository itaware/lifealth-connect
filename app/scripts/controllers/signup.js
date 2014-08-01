'use strict';

angular.module('lifealthApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Auth.createUser({
          lastName: $scope.user.lastName,
          firstName: $scope.user.firstName,
          email: $scope.user.email,
          password: $scope.user.password,
          role: 'DOCTOR'
        })
        .then( function() {
          // Account created, redirect
          $location.path('/medecin');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });