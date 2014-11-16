var app = angular.module('starter.controllers', [])


app.controller('HomeCtrl', function($scope) {
});

/*
 * Controller for coinflip view
 * @param $scope - passd by angular
 */
app.controller('CoinflipCtrl', function($scope, $timeout)
{
    var min = 10;
    var max = 31;

    $scope.should = true;
    $scope.amount = 0;

    /*
     * flips the coin
     */
    $scope.flip = function()
    {
        $scope.amount = Math.floor(Math.random()*(max-min+1)) + min;
        $scope.rotate(0);
    };

    /*
     * Reflips the coin
     */
    $scope.reflip = function()
    {
        $scope.$broadcast('scroll.refreshComplete');
        $timeout($scope.flip, 800);
        //$scope.flip();
    };



    /*
     * Rotates the "coin" by one - is called recursively
     * @param {number} i - the count of the recursive call
     */
    $scope.rotate = function(i)
    {
        if(i <= $scope.amount)
        {
            var timeout = Math.ceil(500 * i / $scope.amount);
            if(timeout < 100 ){timeout = 100};

            $scope.should = !$scope.should;
            $scope.$apply();

            $timeout(function(){
                $scope.rotate(i+1);
            },timeout);
        }
        else
        {
            $scope.amount = 0;
            $scope.$apply();
        }
    };

    $scope.flip();


});
