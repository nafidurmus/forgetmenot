(function () {
  `use strict`;

  angular
    .module('forgetmenot')
    .factory('arrayFactory', arrayFactory)

    arrayFactory.$inject = ['$http', '$q'];

  function arrayFactory ($http, $q) {

    let __contract = {};
    let __web3 = {};

    const Model = (key, value, createdBlock, linkToPreviousBlock) => {
      return {
        key: key,
        value: value,
        createdBlock: createdBlock,
        linkToPreviousBlock: linkToPreviousBlock
      };
    };

    function Init(web3) {

      __web3 = web3;

      const q = $q.defer();

      $http.get('./ForgetmenotArray.json')
        .then(response => {
          console.log(`Contract Address ${response.data.networks["4447"].address}`);

          const cont = __web3.eth.contract(response.data.abi);
          __contract = cont.at(response.data.networks["4447"].address);

          q.resolve();

        })
        .catch(err => {
          console.log(`Init Error`, err);
          q.reject();
        });

      return q.promise;
    }

    function GetEventAtBlock(blocknumber) {

      const q = $q.defer();

      __contract.fetchEntry(undefined, undefined, blocknumber, (err, data) => {

        if (err) {
          console.log(`GetEventAtBlock Error ${blocknumber}`, err.message);
          q.reject(err);
        }

        console.log('GetEventAtBlock response', data);

        q.resolve(Model(data[0], data[1], data[2].toNumber(), data[3].toNumber()));

      });

      return q.promise;

    }

    function AddEvent(key, value) {

      const q = $q.defer();

      __contract.createEntry(key, value, undefined, undefined, (err, data) => {

        if (err) {
          console.log('AddEvent error', err.message);
          console.log('AddEvent error stack', err.stack);
          q.reject(err);
        }

        console.log('AddEvent response', data);
        q.resolve(data);
      });

      return q.promise;
    }

    function GetBalance(coinbase) {

      const q = $q.defer();

      __web3.eth.getBalance(coinbase, (err, response) => {

        if (err) {
          q.reject(err);
        }

        const balance = web3.fromWei(response.toNumber(), "ether");
        console.log(`Balance = ${balance} ether`);

        q.resolve(balance);

      });

      return q.promise;
    }

    function GetCoinbase() {
      const q = $q.defer();
      q.resolve(web3.eth.coinbase);
      return q.promise;
    }

    return {
      Model: Model,
      Init: Init,
      GetEventAtBlock: GetEventAtBlock,
      AddEvent: AddEvent,
      GetCoinbase: GetCoinbase,
      GetBalance: GetBalance
    };
  }



})();