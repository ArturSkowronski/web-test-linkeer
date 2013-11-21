'use strict';



var linkeerApiTestApp = angular.module('linkeerApiTestApp', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)
}]);

linkeerApiTestApp.controller('EndpointController', function ($scope,$window) {

    $scope.alertStyle="danger";
    $scope.alertText="Backend Offline";
    $scope.authorized=false;
    
    var apisToLoad=2;
    var CLIENT_ID ='398216293170-5a41ghmu4hrc36e37qk9hkbs1prg4c86.apps.googleusercontent.com';
    var SCOPES ='https://www.googleapis.com/auth/userinfo.email';
    var apiRoot='//localhost:8080/_ah/api';



    $window.init= function() {
      $scope.$apply($scope.loadLinkeer);
  };

  $scope.signin = function() {
    if($scope.authorized){
      $scope.authorized=false;  
  }
  else{
   gapi.auth.authorize({client_id: CLIENT_ID,
      scope: SCOPES, immediate: false},
      callback);}
}

$scope.signinTwo = function() {
   gapi.auth.authorize({client_id: CLIENT_ID,
      scope: SCOPES, immediate: true},
      userAuthed);
}

$scope.$watch('authorized', function() {
   if($scope.authorized){
     $scope.buttonText="Sign Out";
     $scope.buttonStyle="success";
 }
 else{
    $scope.buttonText="Sign In";
    $scope.buttonStyle="danger";
}
});


var userAuthed = function() {
  var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
    if (!resp.code) {
        $scope.alertStyle="success";
        $scope.alertText="Backend Online, logged as "+resp.email;
        $scope.sender_id=resp.id;
        $scope.authorized=true;
        $scope.$apply();
    }
})
};

var callback = function() {
    console.log("api function");
    $scope.alertStyle="warning";
    $scope.alertText="Backend Online, not logged";
    $scope.$apply();
    gapi.auth.authorize({client_id: CLIENT_ID,
      scope: SCOPES, immediate: true},
      userAuthed);
    if (--apisToLoad == 0) {
      console.log("api loaded");
      $scope.signinTwo(true, userAuthed);
  }
}

$scope.loadLinkeer = function() {
  console.log("api init");
  gapi.client.load('linkeer', 'v1', callback, apiRoot);
  gapi.client.load('oauth2', 'v2', callback);
}
});


linkeerApiTestApp.controller('PostLinkController', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.linkShare = function() {
        var request={'link_url': $scope.link_url,
        'fake_id': $scope.sender_id,
        'receiver_id': $scope.receiver_id,
        'description': $scope.description};
        gapi.client.linkeer.link.post(request).execute(function(resp) {
             var messages=resp.messages;   
             $scope.tables.push({"request": JSON.stringify(request, null, "\n"), "response": resp.result, "result":  resp.result.success, "messages":messages});
             $scope.$apply();
     });
    };
});

linkeerApiTestApp.controller('GetLinkController', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.getLink = function() {
        var request={
            'sender_id': $scope.sender_id,
            'receiver_id': $scope.receiver_id,
            'fake_id': $scope.fake_id
        };
        gapi.client.linkeer.link.get(request).execute(function(resp) {
             var messages=resp.messages;   
             var data = 0;
             if(resp.data!=undefined)data=resp.data.length;
             $scope.tables.push({
                            "request": JSON.stringify(request, null, "\n"),
                            "response": JSON.stringify(resp.result, null, "\n"),
                            "result":  resp.success,
                            "toShow":  data,
                            "messages":messages});
             $scope.$apply();
     });
    };
});

linkeerApiTestApp.controller('CreateUserController', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.createUser = function() {
        var request={
            'fake_id': $scope.fake_id
        };
        gapi.client.linkeer.create.user(request).execute(function(resp) {
             var messages=resp.messages;   
             var data = 0;
             if(resp.data!=undefined)data=resp.data.length;
             $scope.tables.push({
                            "request": JSON.stringify(request, null, "\n"),
                            "response": JSON.stringify(resp.result, null, "\n"),
                            "result":  resp.success,
                            "toShow":  data,
                            "messages":messages});
             $scope.$apply();
     });
    };
});

linkeerApiTestApp.controller('AuthorizeUserController', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.authorizeUser = function() {
        var request={
            'fake_id': $scope.fake_id
        };
        gapi.client.linkeer.authorize.user(request).execute(function(resp) {
             var messages=resp.messages;   
             var data = 0;
             if(resp.data!=undefined)data=resp.data.length;
             $scope.tables.push({
                            "request": JSON.stringify(request, null, "\n"),
                            "response": JSON.stringify(resp.result, null, "\n"),
                            "result":  resp.success,
                            "toShow":  data,
                            "messages":messages});
             $scope.$apply();
     });
    };
});


linkeerApiTestApp.controller('SelectUserController', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.selectUser = function() {
        var request={
            'fake_id': $scope.fake_id,
            'id': $scope.id

        };
        gapi.client.linkeer.select.user(request).execute(function(resp) {
             var messages=resp.messages;   
             var data = 0;
             if(resp.data!=undefined)data=resp.data.length;
             $scope.tables.push({
                            "request": JSON.stringify(request, null, "\n"),
                            "response": JSON.stringify(resp.result, null, "\n"),
                            "result":  resp.success,
                            "toShow":  data,
                            "messages":messages});
             $scope.$apply();
     });
    };
});

linkeerApiTestApp.controller('SendInvitation', function ($scope,$window) {
    var request=""
    var response=""

    $scope.tables=[];

    $scope.sendInvitation = function() {
        var request={
            'fake_id': $scope.fake_id,
            'id': $scope.id

        };
        gapi.client.linkeer.send.invitation(request).execute(function(resp) {
             var messages=resp.messages;   
             var data = 0;
             if(resp.data!=undefined)data=resp.data.length;
             $scope.tables.push({
                            "request": JSON.stringify(request, null, "\n"),
                            "response": JSON.stringify(resp.result, null, "\n"),
                            "result":  resp.success,
                            "toShow":  data,
                            "messages":messages});
             $scope.$apply();
     });
    };
});


function init() {
  window.init();
}

