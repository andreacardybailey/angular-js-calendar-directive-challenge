var app = angular.module('calendarDemoApp', []);

app.directive('calendar', function(){
  return {
    scope: true,
    restrict: 'E',
    templateUrl: 'calendar.html',
    controller: function($scope, $element, $attrs) {
      $scope.calRange = CalendarRange.getMonthlyRange(new Date());

      var now = new Date;
      var currentMonth = now.getMonth();
      var currentYear = now.getFullYear();

      $scope.months = {
        type: "select", 
        name: "months",
        value: "", 
        values: ['Jan','Feb','March','April', 'May','June','July','Aug','Sept','Oct','Nov','Dec'] 
      };
      $scope.months.value = $scope.months.values[currentMonth];

      $scope.years = {
        type: "select", 
        name: "years",
        value: currentYear, 
        values: [] 
      };

      var populateYearsArray = function(){
        var past = currentYear - 20;
        var future = currentYear + 20;
        for(var i=past;i<=future;i++) {
          $scope.years.values.push(i);
        }
      }();

      $scope.updateCalRange = function() {
        var newDate = new Date();
        newDate.setFullYear(parseInt($scope.years.value));
        newDate.setMonth(parseInt($scope.months.values.indexOf($scope.months.value)));
        $scope.calRange = CalendarRange.getMonthlyRange(newDate);
      }
      $scope.isCurrentMonth = function(dayIndex) {
        if ($scope.calRange.start.getMonth() == $scope.calRange.days[dayIndex].month){
          return true;
        }
        else {
          return false;
        }
      }
    }
  };
});