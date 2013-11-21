request=""
response=""
$scope.table=[]

$scope.getLink = () ->
	request=
		'sender_id': $scope.sender_id,
		'receiver_id': $scope.receiver_id,
		'fake_id': $scope.fake_id
	gapi.client.linkeer.link.get(request).execute (resp) ->
             messages=resp.messages;   
             data = 0;
             if resp.data!=undefined 
             	data=resp.data.length;
             $scope.tables.push {"request": JSON.stringify(request, null, "\n"),"response": JSON.stringify(resp.result, null, "\n"), "result":  resp.success,"toShow":  data, "messages":messages}
             $scope.$apply()  