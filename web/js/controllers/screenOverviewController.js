/**
 * @file
 * Screen overview controllers.
 */

/**
 * Screens controller handles the display and selection of screens.
 */
ikApp.controller('ScreenOverviewController', ['$scope', 'screenFactory', 'userFactory',
  function($scope, screenFactory, userFactory) {
    "use strict";

    $scope.loading = false;

    // Set default values.
    $scope.orientation = 'all';
    $scope.showFromUser = 'all';
    $scope.sort = { "created_at": "desc" };

    userFactory.getCurrentUser().then(
      function(data) {
        $scope.currentUser = data;
      }
    );

    // Default pager values.
    $scope.pager = {
      "size": 9,
      "page": 0
    };
    $scope.hits = 0;

    // Screens to display.
    $scope.screens = [];

    // Setup default search options.
    var search = {
      "fields": [ 'title' ],
      "text": '',
      "sort": {
        "created_at" : {
          "order": "desc"
        }
      },
      'pager': $scope.pager
    };

    /**
     * Updates the screens array by send a search request.
     */
    $scope.updateSearch = function() {
      // Get search text from scope.
      search.text = $scope.search_text;

      $scope.loading = true;

      screenFactory.searchScreens(search).then(
        function(data) {
          // Total hits.
          $scope.hits = data.hits;

          // Extract search ids.
          var ids = [];
          for (var i = 0; i < data.results.length; i++) {
            ids.push(data.results[i].id);
          }

          // Load slides bulk.
          screenFactory.loadScreensBulk(ids).then(
            function (data) {
              $scope.screens = data;

              $scope.loading = false;
            }
          );
        }
      );
    };

    /**
     * Update search result on screen deletion.
     */
    $scope.$on('screen-deleted', function(data) {
      $scope.updateSearch();
    });

    // Send the default search query.
    $scope.updateSearch();

    /**
     * Changes orientation and updated the screens.
     *
     * @param orientation
     *   This should either be 'landscape' or 'portrait'.
     */
    $scope.setOrientation = function(orientation) {
      if ($scope.orientation !== orientation) {
       $scope.orientation = orientation;

        $scope.setSearchFilters();

        $scope.updateSearch();
      }
    };

    /**
     * Changes if all slides are shown or only slides belonging to current user
     *
     * @param user
     *   This should either be 'mine' or 'all'.
     */
    $scope.setUser = function setUser(user) {
      if ($scope.showFromUser !== user) {
        $scope.showFromUser = user;

        $scope.setSearchFilters();
        $scope.updateSearch();
      }
    };

    /**
     * Updates the search filter based on current orientation and user
     */
    $scope.setSearchFilters = function setSearchFilters() {
      // Update orientation for the search.
      delete search.filter;

      if($scope.orientation !== 'all' || $scope.showFromUser !== 'all') {
        search.filter = {
          "bool": {
            "must": []
          }
        }
      }

      if ($scope.orientation !== 'all') {
        var term = new Object();
        term.term = {orientation : $scope.orientation};
        search.filter.bool.must.push(term);
      }

      if ($scope.showFromUser !== 'all') {
        var term = new Object();
        term.term = {user : $scope.currentUser.id};
        search.filter.bool.must.push(term);
      }

      $scope.updateSearch();

    };

    /**
     * Changes the sort order and updated the screens.
     *
     * @param sort_field
     *   Field to sort on.
     * @param sort_order
     *   The order to sort in 'desc' or 'asc'.
     */
    $scope.setSort = function(sort_field, sort_order) {
      // Only update search if sort have changed.
      if ($scope.sort[sort_field] === undefined || $scope.sort[sort_field] !== sort_order) {

        // Update the store sort order.
        $scope.sort = { };
        $scope.sort[sort_field] = sort_order;

        // Update the search variable.
        search.sort = { };
        search.sort[sort_field] = {
          "order": sort_order
        };

        $scope.updateSearch();
      }
    };
  }
]);
