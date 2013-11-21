linkeerApiTestApp.controller 'PostLinkController', ($scope,$window) ->
    request=""
    response=""
    $scope.tables=[];

    $scope.linkShare = ()->
        request =
            'link_url': $scope.link_url
            'fake_id': $scope.sender_id,
            'receiver_id': $scope.receiver_id
            'description': $scope.description
        gapi.client.linkeer.link.post(request).execute (resp) ->
             messages=resp.messages
             $scope.tables.push({"request": JSON.stringify(request, null, "\n"), "response": resp.result, "result":  resp.result.success, "messages":messages})
             $scope.$apply()