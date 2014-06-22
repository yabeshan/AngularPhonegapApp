
appGap.controller('MenuCtrl', function($scope, $state) {

});

appGap.controller('MapCtrl', ['$scope', '$state', '$ionicModal', '$ionicSideMenuDelegate',
    function($scope, $state, $ionicModal, $ionicSideMenuDelegate) {

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

        $scope.openMenu = function(index) {
            $ionicSideMenuDelegate.toggleLeft();
        }

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

appGap.windowSize = null;
appGap.controller('HomeCtrl', function($scope, $state, $window) {
    if (appGap.windowSize==null) {
        appGap.windowSize = {'width':$window.innerWidth, 'height':$window.innerHeight};
    }


    $scope.goMap = function(){
        $state.go('app.map');
    };

});

appGap.gMap = null;
appGap.controller('MapPanelController', function($scope, $state) {
    if (appGap.gMap!=null) return;

    var markers = [];
    appGap.gMap = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));
    appGap.gMap.fitBounds(defaultBounds);

    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    appGap.gMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        alert(111);
        var places = searchBox.getPlaces();

        for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: appGap.gMap,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        appGap.gMap.fitBounds(bounds);
        alert(222);
    });

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(appGap.gMap, 'bounds_changed', function() {
        var bounds = appGap.gMap.getBounds();
        searchBox.setBounds(bounds);
    });
});
