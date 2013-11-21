(function() {
  var request, response;

  request = "";

  response = "";

  $scope.table = [];

  $scope.sendInvitation = function() {
    request = {
      'fake_id': $scope.fake_id({
        'id': $scope.id
      })
    };
    return gapi.client.linkeer.send.invitation(request).execute(function(resp) {
      var data, messages;
      messages = resp.messages;
      data = 0;
      if (resp.data !== void 0) {
        data = resp.data.length;
      }
      $scope.tables.push({
        "request": JSON.stringify(request, null, "\n"),
        "response": JSON.stringify(resp.result, null, "\n"),
        "result": resp.success,
        "toShow": data,
        "messages": messages
      });
      return $scope.$apply();
    });
  };

}).call(this);
