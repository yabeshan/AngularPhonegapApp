function onDeviceReady() {
//    angular.bootstrap(document, ["appGap"]);
}

document.addEventListener('deviceready', onDeviceReady, false);
setTimeout(function(){
    if (window.location.protocol.indexOf('file:')==0) {
        onDeviceReady();    
    }
},200);