angular.module('jsCalc', [])
  .controller('CalcController', ['$scope', function($scope) {

    $scope.mathResult = '';

    //Calculate the input
    $scope.doMath = function(num) {
      //Check that we have a math expression and last character in expression is a number
      var numCheck = $scope.mathResult.charAt($scope.mathResult.length -1);
      var regex = /\D+/;
      if($scope.mathResult.length > 0 && regex.exec(numCheck) === null  ){
        //console.log(numCheck);
        $scope.mathResult = math.eval($scope.mathResult);
      }
    };
}]);
