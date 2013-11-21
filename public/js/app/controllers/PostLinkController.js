(function() {
  linkeerApiTestApp.controller('PostLinkController', function($scope, $window) {
    var request, response;
    request = "";
    response = "";
    $scope.tables = [];
    return $scope.linkShare = function() {
      request = {
        'link_url': $scope.link_url,
        'fake_id': $scope.sender_id,
        'receiver_id': $scope.receiver_id,
        'description': $scope.description
      };
      return gapi.client.linkeer.link.post(request).execute(function(resp) {
        var messages;
        messages = resp.messages;
        $scope.tables.push({
          "request": JSON.stringify(request, null, "\n"),
          "response": resp.result,
          "result": resp.result.success,
          "messages": messages
        });
        return $scope.$apply();
      });
    };
  });

}).call(this);
