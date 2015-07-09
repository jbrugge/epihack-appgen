angular.module('epihack.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ReportCtrl', function($scope, $ionicModal, $timeout) {

    // =============
    // USER
    // =============
    $scope.user = {
        gender: '',
        yearOfBirth: '',
        origin: ''
    };
    $scope.genders = GENDERS;
    $scope.countries = COUNTRIES;
    $scope.years = YEAR_OF_BIRTH;
    $scope.symptoms = SYMPTOMS;

    // For force logout
    //window.localStorage.removeItem('user');

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;

        if (window.localStorage['user']) {
            $scope.user = JSON.parse(window.localStorage['user']);
        }
        else {
            $scope.login();
        }

    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };


    $ionicModal.fromTemplateUrl('templates/thank.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.thankModal = modal;
    });

    // Open the login modal
    $scope.thank = function() {
        $scope.thankModal.show();
    };
    $scope.closeThank = function() {
        $scope.thankModal.hide();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        // TODO: POST API to epihack

        window.localStorage['user'] = JSON.stringify($scope.user);
        console.log('Doing login', $scope.user);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    // =============
    // REPORT
    // =============
    $scope.report = {};
    $scope.doReport = function (form) {

        // TODO: POST API to epihack
        console.log($scope.report);
    };
});
