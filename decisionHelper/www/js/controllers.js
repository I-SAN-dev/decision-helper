angular.module('starter.controllers', [])


.controller('HomeCtrl', function($scope) {
})

.controller('CoinflipCtrl', function($scope) {
      $scope.should = true;
      $scope.amount = 0;
      $scope.roll = function()
      {
        $scope.amount = 10;
        $scope.rotate(0);
      };

      $scope.rotate = function(i)
      {
        if(i<=$scope.amount)
        {
          $scope.should = !$scope.should;
          window.setTimeout(function(){
            $scope.rotate(i+1);
          },1000);
        }
      };

      $scope.roll();


});
