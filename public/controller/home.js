chatApp.controller("homeCntrl", function ($scope, $http, $state,SocketService) {
    $scope.array1 = []
    $scope.final = JSON.parse(window.localStorage.getItem('store'));
    var uname = localStorage.getItem('uname');
    // console.log($scope.final);
    $scope.value = {
        'id': $scope.final.userid
    }

    $http({
        method: 'get',
        url: '/auth/' + '/users/' + $scope.final.userid + '/list',
        headers: {
            'token': $scope.final.token,
        },
        params: $scope.value
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data.message);
            for (const key in response.data.message) {

                $scope.array1.push(response.data.message[key]);
            }
            console.log($scope.array);
        }
        else if (response.status == 404) {
            console.log("error.");
            console.log(response);
        }
    }, function (response) {

        $scope.message = response.data;
    })

    var socket = io.connect('http://localhost:8080');




    $scope.logout = function () {

        localStorage.removeItem('store');
        // localStorage.removeItem('id');
        localStorage.removeItem('uname');
        $state.go('login');

    }

    $scope.array= [];
    $scope.message = '';
    SocketService.emit('room', { roomId: "temp" });

    $scope.add = function () {

        SocketService.emit('toBackEnd', { 'message': $scope.message, 'date': new Date(), 'username': uname })
        $scope.array.push({ 'message': $scope.message, 'date': new Date(), 'username': uname })
    }
    $http({
        method: 'GET',
        url: '/users/messageHistory',

    }).then(function (response) {
        
        $scope.msgList = response.data.message;
    });

    SocketService.on('message', function (msg) {
        $scope.msgList.push(msg)

    });

});



