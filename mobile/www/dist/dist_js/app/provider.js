/**
 * Created by zhuangzhuang.a.liu on 3/19/2016.
 */
angular.module('app.provider', [])

  .constant('EnvironmentString', {
    LOCAL: 'LOCAL',
    MOBILE: 'MOBILE',
    DEV: 'DEV',
    STAG: 'STAG',
    PROD: 'PROD'
  })

  .provider('EnvironmentData', ['EnvironmentString', function (envs) {
    var webBaseurl = ['','file:///android_asset/www','http://120.25.102.53/RockPlant'];

    var config = {
      env: '',
      url: {},
      clientID: ''
    };

    var envIndex = -1;

    this.setEnvironment = function (env) {
      if (env === envs.LOCAL) {
        envIndex = 0;
      } else if (env === envs.MOBILE) {
        envIndex = 1;
      } else if (env === envs.DEV) {
        envIndex = 2;
      } else if (env === envs.STAG) {
        envIndex = 3;
      } else if (env === envs.PROD) {
        envIndex = 4;
      }

      config.env = envIndex;

      //config.url = {
      //  // TODO Change below mock url to real webapi url
      //  // www.econny.com/api/plant/getplantinfo/{id}
      //  plantinfo: webBaseurl[envIndex] + '/data/mock/plantinfo.json',
      //  plantproperties: webBaseurl[envIndex] + '/data/mock/plantproperties.json',
      //  realtimesensordata: webBaseurl[envIndex] + '/data/mock/realtimesensordata.json',
      //  light: webBaseurl[envIndex] + '/data/mock/light.json',
      //  air: webBaseurl[envIndex] + '/data/mock/air.json',
      //  temp: webBaseurl[envIndex] + '/data/mock/temp.json',
      //  soil: webBaseurl[envIndex] + '/data/mock/soil.json'
      //}

      config.url = {
        // TODO Change below mock url to real webapi url
        // www.econny.com/api/plant/getplantinfo/{id}
        plantList: webBaseurl[envIndex] + '/app/appController.do?operation=searchownee&user_search_id={0}&user_login_id={1}',
        bindPlant: webBaseurl[envIndex] + '/app/appController.do?operation=bind&user_login_id={0}&plant_id={1}&circusID={2}',
        sendMessage: webBaseurl[envIndex] + '/app/talk2plant.do?question={0}',
        queryStatus: webBaseurl[envIndex] + '/app/queryStatus.do'
      };
    };

    this.$get = function () {
      return config;
    };
  }]);

