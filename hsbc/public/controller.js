let bblApp = angular.module('bblApp', [
  'ui.select', 'ngSanitize', 'ngTable'
])
  .controller('statsCtrl', function ($scope, $http, NgTableParams) {

    $scope.props = {
      'showPlayerInfo': false,
      'showTeamInfo': false
    };

    $scope.playerNames = [];
    $scope.teamNames = [];

    //This method displays the stats of a player.
    $scope.displayPlayerStats = function (stats) {
      $scope.props.showPlayerInfo = true;
      $scope.battingStats = stats.battingStats;
      $scope.bowlingStats = stats.bowlingStats;
    };

    //This method fetches the stats of a player.
    $scope.getPlayerStats = function (player) {
      let playerId = player.id;
      let url = document.location.protocol + "//" + document.location.host + '/getPlayerStats';
      $http.get(url, {
        'params': { 'playerId': playerId },
        'headers': { 'apiKey': 'QWERASDZXC12' }
      })
        .then((response) => {
          $scope.displayPlayerStats(response.data);
        }).catch((error) => {
          alert(error.data);
        })
    };

    //This function displays the suggestions for player name.
    $scope.listOfPlayerNames = function (playerNames) {
      $scope.playerNames.length = 0;
      playerNames.forEach(function (playerName) {
        $scope.playerNames.push({ 'id': playerName._id, 'name': playerName.name });
      });
    };

    //This function takes player name as argument and fetches all the players that match the regex.
    $scope.getSuggestionsForPlayerName = function (playerName) {
      let url = document.location.protocol + "//" + document.location.host + '/getSuggestionsForPlayerName';
      $http.get(url, {
        'params': { 'playerName': playerName },
        'headers': { 'apiKey': 'QWERASDZXC12' }
      })
        .then((response) => {
          $scope.listOfPlayerNames(response.data);
        }).catch((error) => {
          alert(error.data);
        })
    };

    //This method display stats of a team.
    $scope.displayTeamStats = function (stats) {
      $scope.props.showTeamInfo = true;
      $scope.teamStats = stats;
      $scope.tableData = new NgTableParams({}, { dataset: $scope.teamStats });
    };

    //This method fetches stats of a team.
    $scope.getTeamStats = function (teamName) {
      let url = document.location.protocol + "//" + document.location.host + '/getTeamStats';
      $http.get(url, {
        'params': { 'teamName': teamName },
        'headers': { 'apiKey': 'QWERASDZXC12' }
      })
        .then((response) => {
          $scope.displayTeamStats(response.data);
        }).catch((error) => {
          alert(error.data);
        })
    };

    //This method lists suggestions for different team names.
    $scope.listOfTeamNames = function (teamNames) {
      $scope.teamNames.length = 0;
      teamNames.forEach(function (teamName) {
        $scope.teamNames.push(teamName);
      });
    };

    //This method fetches suggestions for a given team name.
    $scope.getSuggestionsForTeamName = function (teamName) {
      let url = document.location.protocol + "//" + document.location.host + '/getSuggestionsForTeamName';
      $http.get(url, {
        'params': { 'teamName': teamName },
        'headers': { 'apiKey': 'QWERASDZXC12' }
      })
        .then((response) => {
          $scope.listOfTeamNames(response.data);
        }).catch((error) => {
          alert(error.data);
        })
    }
  });