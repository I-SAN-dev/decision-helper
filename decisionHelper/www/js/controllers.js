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


app.controller('ProconCtrl', function ($scope) {

   $scope.procon = {
       left:{
           name:'',
           points: 0
       },
       right:{
           name:'',
           points:0
       },
       setup: false
   };

    $scope.setState = function(){
        if($scope.procon.left.name != '' && $scope.procon.right.name != ''){
            $scope.procon.setup = true;
        }
        else {
            $scope.procon.setup = false;
        }
    };

    $scope.addProcon = function(left, pro) {
        allert('Button clicked!');
        if(left) {
            if (pro) {
                procon.left.points += 1;
            } else {
                procon.left.points -= 1;
            }
        } else {
            if (pro) {
                procon.right.points += 1;
            }else {
                procon.right.points -= 1;
            }
        }
    };


});

/*
 * The multicon controller
 */
app.controller('MulticonCtrl', function($ionicSideMenuDelegate){

    this.toggleLeftSideMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };
    this.toggleRightSideMenu = function() {
        $ionicSideMenuDelegate.toggleRight();
    };

    this.newPro =
    {
        title: '',
        rating: 3
    };
    this.newCon =
    {
        title: '',
        rating: 3
    };
    this.proList = [];
    this.conList = [];
    this.proConRating = 0.5;
    this.proTotal = 0;
    this.conTotal = 0;

    this.calcResult = function()
    {
        var that = this;
        this.proTotal = 0;
        this.proList.forEach(function (element) {
            that.proTotal += parseInt(element.rating);
        });

        this.conTotal = 0;
        this.conList.forEach(function (element) {
            that.conTotal += parseInt(element.rating);
        });

        if((this.conTotal == 0) && (this.proTotal == 0))
        {
            return 0.5;
        }
        if((this.conTotal == 0) && (this.proTotal != 0))
        {
            return 0;
        }
        if((this.conTotal != 0) && (this.proTotal == 0))
        {
            return 1;
        }

        var gesamt = parseInt(this.proTotal) + parseInt(this.conTotal);
        return this.conTotal / gesamt;

    };
    this.sortArgs = function()
    {
        var ratingsort = function(a, b)
        {
            return b.rating - a.rating
        };
        this.proList.sort(ratingsort);
        this.conList.sort(ratingsort);
    };

    this.addPro = function()
    {
        this.proList.push(this.newPro);
        this.newPro = {
            rating: 3
        };
        this.proConRating = this.calcResult();
        this.sortArgs();
    };

    this.addCon = function()
    {
        this.conList.push(this.newCon);
        this.newCon = {
            rating: 3
        };
        this.proConRating = this.calcResult();
        this.sortArgs();
    };


});