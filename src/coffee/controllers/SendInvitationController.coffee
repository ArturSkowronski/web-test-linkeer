request=""
response=""
$scope.table=[]

$scope.sendInvitation = () ->
	request=
		'fake_id': $scope.fake_id
        'id': $scope.id

	gapi.client.linkeer.send.invitation(request).execute (resp) ->
             messages=resp.messages;   
             data = 0;
             if resp.data!=undefined 
             	data=resp.data.length;
             $scope.tables.push {"request": JSON.stringify(request, null, "\n"),"response": JSON.stringify(resp.result, null, "\n"), "result":  resp.success,"toShow":  data, "messages":messages}
             $scope.$apply()