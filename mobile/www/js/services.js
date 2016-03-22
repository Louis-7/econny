angular.module('app.services', [])

  .factory('Utility', function () {
    return {
      isEmptyOrNull: function (obj) {
        /// <summary>
        /// Retrieve true when object is empty, undefined or null.
        /// </summary>
        /// <param name="obj">Object to be checked</param>
        /// <returns type="boolean">True when object is empty, undefined or null.</returns>
        /// <doc>myExpenses.factory:methods#isEmptyOrNull</doc>

        return (
          (obj === undefined) ||
          (obj === null) ||
          (angular.isString(obj) && (obj === '')) || // String
          (angular.isArray(obj) && (obj.length === 0)) // Arrays
        );
      },
      parse: function () {
        /// <summary>
        /// Format string using string.format way to match parameters.
        /// </summary>
        /// <returns type="string">String parsed.</returns>
        /// <doc>myExpenses.factory:methods#parse</doc>

        var args = arguments,
          url = '',
          baseUrl = '',
          qs = '',
          qsFormatted = '',
          splitted,
          vars = [],
          hash, i;

        if (args === null || args.length === 0) {
          return "";
        }

        if (args.length === 1) {
          url = args[0];
        } else {
          url = args[0].replace(/\{(\d+)\}/g, function (match, number) {
            return args[parseInt(number, 10) + 1] !== undefined ? args[parseInt(number, 10) + 1] : '';
          });
        }

        baseUrl = url;

        return baseUrl + qsFormatted;
      },
      urlFormat: function () {
        /// <summary>
        /// Format url using string.format way to match parameters.
        /// </summary>
        /// <returns type="string">String parsed.</returns>
        var args = arguments,
          url = '',
          baseUrl = '',
          qs = '',
          qsFormatted = '',
          splitted,
          vars = [],
          hash, i;

        if (this.isEmptyOrNull(args)) {
          return "";
        }

        if (args.length === 1) {
          url = args[0];
        } else {
          url = args[0].replace(/\{(\d+)\}/g, function (match, number) {
            return args[parseInt(number, 10) + 1] !== undefined ? encodeURIComponent(args[parseInt(number, 10) + 1]) : '';
          });
        }

        // Remove empty qs parameters
        if (url.indexOf('?') >= 0) {
          splitted = url.split('?');
          baseUrl = splitted[0];

          if (splitted.length > 1) {
            qs = splitted[1].split('&');
            for (i = 0; i < qs.length; i++) {
              if (qs[i].indexOf('=') >= 0) {
                hash = qs[i].split('=');
                vars.push({
                  code: hash[0],
                  value: hash[1]
                });
              } else {
                vars.push({
                  code: qs[i],
                  value: ''
                });
              }
            }

            // Fill qsFormatted using vars and removing empty values
            for (i = 0; i < vars.length; i++) {
              if (vars[i].value && vars[i].value !== '') {
                qsFormatted = qsFormatted + ((qsFormatted === '') ? '?' : '&') + vars[i].code + '=' + vars[i].value;
              }
            }

          }
        } else {
          baseUrl = url;
        }

        return baseUrl + qsFormatted;
      }
    };
  })

  .factory('econnyService', ['$http', '$q', 'EnvironmentData', 'Utility', function ($http, $q, env, util) {
    var econny = {};

    econny.getPlantList = function (searchId, loginId) {
      var defer = $q.defer();
      var url = util.urlFormat(env.url.plantList, searchId, loginId);

      $http({
        method: 'GET',
        url: url
      }).success(function (response, header, config, status) {
        defer.resolve(response, header, config, status);
      }).error(function (response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    };

    return econny;
  }])

  .factory('plantListService', ['$http', '$q', 'EnvironmentData', 'Utility', function ($http, $q, env, util) {
    var plantList = {};

    plantList.bindPlant = function (loginId, plantId, circleId) {
      var defer = $q.defer();
      var url = util.urlFormat(env.url.bindPlant, loginId, plantId, circleId);

      $http({
        method: 'GET',
        url: url
      }).success(function (response, header, config, status) {
        defer.resolve(response, header, config, status);
      }).error(function (response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    };

    plantList.getPlantList = function () {
      var defer = $q.defer();
      var url = 'mock/plantlist.json';

      $http({
        method: 'GET',
        url: url
      }).success(function (response, header, config, status) {
        defer.resolve(response, header, config, status);
      }).error(function (response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    };

    return plantList;
  }])

  .factory('livingRoomService', ['$http', '$q', 'EnvironmentData', 'Utility', function ($http, $q, env, util) {
    var livingRoom = {};

    livingRoom.sendMessage = function (message) {
      var defer = $q.defer();
      var url = util.urlFormat(env.url.sendMessage,message);
      $http({
        method: 'GET',
        url: url
      }).success(function (response, header, config, status) {
        defer.resolve(response, header, config, status);
      }).error(function (response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    };

    livingRoom.queryStatus = function () {
      var defer = $q.defer();
      var url = env.url.queryStatus;
      $http({
        method: 'GET',
        url: url
      }).success(function (response, header, config, status) {
        defer.resolve(response, header, config, status);
      }).error(function (response, status) {
        defer.reject(response, status);
      });
      return defer.promise;
    };

    return livingRoom;
  }]);
