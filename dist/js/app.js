angular.module('jsCalc', [])
  .controller('CalcController', ['$scope', function($scope) {
    //outputs numbers to screen
    $scope.currentNumber = '0';
    //stores calculated expression
    var currentExpression = '';
    //keeps track if expression calculated
    var calcFinished = false;

    $scope.numInput = function(num,operator) {
      $scope.currentOperator = operator;
      /*clear out currentNumber if previously evaluated expression
       still inside variable before adding new numbers */
      if(calcFinished === true){
        $scope.currentNumber = '0';
        calcFinished = false;
      }
      /*if user inputs a number followed by an operator,
        add current num and operator to currentExpression and clear out currentNumber
        so new num can be added */
      else if($scope.currentOperator !== undefined){
        currentExpression +=$scope.currentNumber+$scope.currentOperator;
        /*need a regex to remove repeated operators and decimals somewhere here!!
        try removing repeated operators/decimals from currentExpression */
        $scope.currentNumber = '';
      }
      /*removes default '0' if at beginning of string when inputting new expressions,
        else just add the new number to currentNumber */
      if($scope.currentNumber.charAt(0) === '0'){
        $scope.currentNumber = $scope.currentNumber.slice(1) + num;
      }else{
      //finally add new number after running through all 'if' checks
      $scope.currentNumber += num;
      }
      //use this log to see output of currentNumber, currentOperator added to currentExpression
      console.log(currentExpression); //remove when finished testing code output
    };

    $scope.calcExpress = function() {
      //concat last input to currentExpression before calculating expression
      currentExpression += $scope.currentNumber;
      //Check that we have a math expression and last character in expression is a number
      var numCheck = currentExpression.charAt(currentExpression.length -1);
      if(currentExpression.length > 0 && /\D+/.exec(numCheck) === null  ){
        $scope.currentNumber = math.eval(currentExpression);
        currentExpression = '';
        calcFinished = true;
      }
    };
}]);
