chatApp.controller('loginCntrl', function ($scope, $http, $state) {
    console.log('login');
    $scope.user = {
        'email': '',
        'password': ''
    }
    console.log($scope.user);
    $scope.login = function () {
        console.log("login calling", $scope.user);
        $http({
            method: 'POST',
            url: '/login',
            data: $scope.user
        }).then(function (response) {
            if (response.data.Success == true) {
                console.log(response.data.message);
                $scope.message = "login successful";
                console.log(response.data.userid);
                $scope.data = {
                    'token': response.data.token,
                    'userid': response.data.userid
                }
                window.localStorage.setItem('store', JSON.stringify($scope.data));
                localStorage.setItem('uname',response.data.username);
                $state.go('home')
            }
            else if (response.data.Success == true) {
                console.log(response);
                $scope.message = "login Unsuccessful"
            }
        }, function (response) {
            console.log(response);
            $scope.message = response.data.message;
        })
    }
})