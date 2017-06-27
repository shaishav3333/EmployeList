/**
 * Created by Shaish
 */
var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'Home.html',
            controller : 'homeController'
        })
        .when("/Home", {
            templateUrl : 'Home.html',
            controller : 'homeController'
        })
        .when("/EmployeeList", {
            templateUrl : 'EmployeeList.html',
            controller: 'employeeController'
        })
        .when("/EditEmployeeList", {
            templateUrl : 'EditEmployeeList.html',
            controller: 'editemployeeController'
        })
});

app.factory('dataService',function ($http) {
   var service = {};
    service.getData = function () {
           return $http.get("MOCK_DATA.JSON");
        };
return service;

var employeeList = {};
return employeeList;

var user = {};
return user;
});

app.controller('homeController',function ($scope,dataService,$location) {
if(!dataService.employeeList){
         dataService.getData().then(function (response) {
             dataService.employeeList = response.data;
             console.log(dataService.employeeList);
             $scope.data = dataService.employeeList;
        });
}
else
{
    $scope.data = dataService.employeeList;
}
$scope.delete = function (id) {
    dataService.employeeList.splice(id,1);
};
$scope.edit = function (index) {
    dataService.user = $scope.data[index];
    $location.path("/EditEmployeeList");
}
});

app.controller("employeeController", function($scope,dataService,$location) {
    $scope.addEmployee = function () {
    dataService.employeeList.push($scope.user);
    console.log(dataService.employeeList);
        $location.path("/Home");
    };
});

app.controller("editemployeeController",function ($scope,dataService,$location) {
    console.log(dataService.user.name);
   $scope.edit.name = dataService.user.name;
    $scope.edit.BirthDate = dataService.user.BirthDate;
    $scope.edit.Age = dataService.user.Age;
    $scope.save = function ($index) {
        dataService.employeeList.splice(id,1,$scope.edit);
        console.log(dataService.employeeList);
        $location.path("/Home");
    };
});
