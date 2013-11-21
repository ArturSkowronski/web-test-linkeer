linkeerApiTestApp.controller 'EndpointController', ($scope, $window) ->
	$scope.alertStyle="danger";
	$scope.alertText="Backend Offline"; 
	$scope.authorized=false;
	apisToLoad=2;
	
	CLIENT_ID ='398216293170-5a41ghmu4hrc36e37qk9hkbs1prg4c86.apps.googleusercontent.com';
	SCOPES ='https://www.googleapis.com/auth/userinfo.email';
	apiRoot='//localhost:8080/_ah/api';
	
	$window.init = () ->
		$scope.$apply $scope.loadLinkeer;
	$scope.signin = () ->
		if $scope.authorized
			$scope.authorized=false
		else
			gapi.auth.authorize {client_id: CLIENT_ID, scope: SCOPES, immediate: false}, callback
	$scope.signinTwo = () ->
		gapi.auth.authorize {client_id: CLIENT_ID,scope: SCOPES, immediate: true}, userAuthed

	$scope.$watch 'authorized', () ->
		if $scope.authorized
			$scope.buttonText="Sign Out"
			$scope.buttonStyle="success"
		else
			$scope.buttonText="Sign In"
			$scope.buttonStyle="dangerr"

	userAuthed = () ->
		request = gapi.client.oauth2.userinfo.get().execute () ->
			if !resp.code
				$scope.alertStyle = "success" 
				$scope.alertText = "Backend Online, logged as " + resp.email
				$scope.sender_id=resp.id
				$scope.authorized=true
				$scope.$apply()

	callback = () ->
		console.log "api functions"
		$scope.alertStyle="warning"
		$scope.alertText="Backend Online, not logged"
		$scope.$apply()
		gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true}, userAuthed)
		if --apisToLoad == 0 
			console.log "api loaded" 
			$scope.signinTwo true, userAuthed
	
	$scope.loadLinkeer = () ->
		console.log "api init" 
		gapi.client.load 'linkeer', 'v1', callback, apiRoot
		gapi.client.load 'oauth2', 'v2', callback 