var app = angular.module('starter.controllers', [])


app.controller('HomeCtrl', function($scope) {
});

app.controller('CoinflipCtrl', function($scope)
{
    var min = 1;
    var max = 3;

    $scope.should = true;
    $scope.amount = 0;
    $scope.roll = function()
    {
        $scope.amount = Math.floor(Math.random()*(max-min+1)) + min;
        $scope.rotate(0);
    };

    $scope.rotate = function(i)
    {
        if(i <= $scope.amount)
        {
            var timeout = Math.ceil(500 * i / $scope.amount);

            $scope.should = !$scope.should;
            $scope.$apply();

            window.setTimeout(function(){
                $scope.rotate(i+1);
            },timeout);
        }
        else
        {

            $scope.amount = 0;

            $scope.apply();
        }
    };

    $scope.roll();


});
