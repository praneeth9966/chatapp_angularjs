chatApp.controller('registrationCntrl', function ($scope, $http) {
    console.log('register');
    $scope.user = {
        'firstname': '',
        'lastname': '',
        'email': '',
        'mobile': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.register = function () {
        console.log("register calling", $scope.user);
        $http({
            method: 'POST',
            url: '/register',
            data: $scope.user
        }).then(function (response) {
            console.log(response);
            if (response.data.error == false) {
                console.log(response.data.message);
                $scope.message = "Registration Successful";
            }
            else if (response.data.error == true) {
                $scope.message = "Registration Unsuccessful"
            }
        },function(response){
            console.log(response);
            $scope.message = response.data.message; 
        })
    }
});