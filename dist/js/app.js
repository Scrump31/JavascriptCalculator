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
    };
    //concats decimal to number and removes consecutive decimals
    $scope.appendDec = function(){
        $scope.currentNumber = $scope.currentNumber+'.';
        $scope.currentNumber = $scope.currentNumber.replace(/(\.{2,})/g, '\.');
    };
    //converts numbers to percent
    $scope.cvtToPerc = function(){
        $scope.currentNumber = Number($scope.currentNumber)/100;
    };
    //toggles converting number to positive/negative number
    $scope.cvtPosNeg = function(){
      if($scope.currentNumber.toString().charAt(0) !== '-'){
        $scope.currentNumber = '-'+$scope.currentNumber;
      }else{
        $scope.currentNumber = $scope.currentNumber.slice(1);
      }
    };
    $scope.calcExpress = function() {
      //concat last input to currentExpression before calculating expression
      currentExpression += $scope.currentNumber;
      //remove repeating operators if they exist
      currentExpression = currentExpression.replace(/(\/{2,})/g, '\/').replace(/(\*{2,})/g, '*').replace(/(\-{2,})/g, '-');
      //Check that we have a math expression and last character in expression is a number
      var numCheck = currentExpression.charAt(currentExpression.length -1);
      if(currentExpression.length > 0 && /\D+/.exec(numCheck) === null  ){
        $scope.currentNumber = math.eval(currentExpression);
        currentExpression = '';
        calcFinished = true;
      }
    };
}]);
