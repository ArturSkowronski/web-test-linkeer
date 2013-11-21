(function() {
  linkeerApiTestApp.controller('EndpointController', function($scope, $window) {
    var CLIENT_ID, SCOPES, apiRoot, apisToLoad, callback, userAuthed;
    $scope.alertStyle = "danger";
    $scope.alertText = "Backend Offline";
    $scope.authorized = false;
    apisToLoad = 2;
    CLIENT_ID = '398216293170-5a41ghmu4hrc36e37qk9hkbs1prg4c86.apps.googleusercontent.com';
    SCOPES = 'https://www.googleapis.com/auth/userinfo.email';
    apiRoot = '//localhost:8080/_ah/api';
    $window.init = function() {
      return $scope.$apply($scope.loadLinkeer);
    };
    $scope.signin = function() {
      if ($scope.authorized) {
        return $scope.authorized = false;
      } else {
        return gapi.auth.authorize({
          client_id: CLIENT_ID,
          scope: SCOPES,
          immediate: false
        }, callback);
      }
    };
    $scope.signinTwo = function() {
      return gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: true
      }, userAuthed);
    };
    $scope.$watch('authorized', function() {
      if ($scope.authorized) {
        $scope.buttonText = "Sign Out";
        return $scope.buttonStyle = "success";
      } else {
        $scope.buttonText = "Sign In";
        return $scope.buttonStyle = "dangerr";
      }
    });
    userAuthed = function() {
      var request;
      return request = gapi.client.oauth2.userinfo.get().execute(function() {
        if (!resp.code) {
          $scope.alertStyle = "success";
          $scope.alertText = "Backend Online, logged as " + resp.email;
          $scope.sender_id = resp.id;
          $scope.authorized = true;
          return $scope.$apply();
        }
      });
    };
    callback = function() {
      console.log("api functions");
      $scope.alertStyle = "warning";
      $scope.alertText = "Backend Online, not logged";
      $scope.$apply();
      gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: true
      }, userAuthed);
      if (--apisToLoad === 0) {
        console.log("api loaded");
        return $scope.signinTwo(true, userAuthed);
      }
    };
    return $scope.loadLinkeer = function() {
      console.log("api init");
      gapi.client.load('linkeer', 'v1', callback, apiRoot);
      return gapi.client.load('oauth2', 'v2', callback);
    };
  });

}).call(this);
