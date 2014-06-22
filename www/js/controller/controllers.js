
appGap.controller('MenuCtrl', function($scope, $state) {

});

appGap.controller('MapCtrl', ['$scope', '$state', '$ionicModal',
    function($scope, $state, $ionicModal) {

        $ionicModal.fromTemplateUrl('js/view/infoPopup.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        $scope.showPopup = function(index) {
            switch(index) {
                case 1:
                    $scope.id = index;
                    break;
                case 2:
                    $scope.id  = index;
                    break;
            }
            $scope.openModal();
        }
    }
]);

appGap.controller('InfoPopupCtrl', function($scope, $state) {


    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });
    $scope.$on('modal.shown', function() {
        console.log('Modal is shown!' + $scope.id);
    });
});



appGap.controller('AboutPageCtrl', function($scope, $state) {

    $scope.Back = function() {
        $state.go('app.map');
    };
});

appGap.controller('HomeCtrl', function($scope, $state) {
    $scope.goMap = function(){
        $state.go('app.map');
    };

});

