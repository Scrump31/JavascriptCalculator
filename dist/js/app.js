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
      /* concats new operator to result of previous calculated expresssion and clears
       out currentNumber so new num can be concatenated to complete expression */
      if(calcFinished === true && $scope.currentOperator === undefined){
        $scope.currentNumber = '0';
        calcFinished = false;
      }
      /*when user inputs num followed by operator,
        concat current num and operator to currentExpression and clear out currentNumber
        so new num can be added */
      else if($scope.currentOperator !== undefined){
        currentExpression +=$scope.currentNumber+$scope.currentOperator;
        /*need a regex to remove repeated operators and decimals somewhere here!!
        try removing repeated operators/decimals from currentExpression */
        $scope.currentNumber = '';
      }
      //adds new numbers
      $scope.currentNumber += num;
      //change fontSize based on number of characters entered
      if($scope.currentNumber.length >= 12){
        document.getElementById("totalScreen").style.fontSize = "35px";
      }else {
        document.getElementById("totalScreen").style.fontSize = "50px";
      }

      //use this log to see output of currentNumber, currentOperator added to currentExpression
      console.log(currentExpression); //remove when finished testing code output
    };
    //converts numbers to percent 
    $scope.cvtToPerc = function(){
        $scope.currentNumber = Number($scope.currentNumber)/100;
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
