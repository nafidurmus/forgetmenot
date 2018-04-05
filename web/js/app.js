(function(){
  `use strict`;

  angular
  .module('forgetmenot', [])
  .controller('controller', controller);

  controller.$inject = ['$scope','$http'];

  function controller($scope, $http) {
    
    // 
    const event = (key, value, createdBlock, linkToPreviousBlock) => {
      return {
        key: key,
        value: value,
        createdBlock: createdBlock,
        linkToPreviousBlock: linkToPreviousBlock
      };
    };
    
    // Signature
    $scope.foundWeb3 = false; 
    $scope.coinbase = "";
    $scope.balanceCurrent = 0;
    $scope.balancePrevious = 0;
    $scope.events = [];

    $scope.refresh = refresh;
    $scope.addEvent = addEvent;


    // init
    if (typeof web3 !== 'undefined') {
      $scope.foundWeb3 = true;
      web3 = new Web3(web3.currentProvider);

      console.log(web3.currentProvider);

      $scope.coinbase = web3.eth.coinbase;

      web3.eth.getBalance($scope.coinbase, (err,response) => {
        $scope.balanceCurrent = web3.fromWei(response.toNumber(), "ether");
      });

      web3.eth.filter('latest').watch(() => {
        web3.eth.getBalance($scope.coinbase, (err,response) => {
          $scope.balancePrevious = $scope.balanceCurrent;
          $scope.balanceCurrent = web3.fromWei(response.toNumber(), "ether");
        });
      });

      $http.get('./Forgetmenot.json')
      .then( response => {
         const cont = web3.eth.contract(response.data.abi);
         $scope.forgetmenot = cont.at(response.data.networks["4447"].address);
         _getEventAtBlock(undefined);

      })
      .catch( err => {
        console.log(err);
      });

    } else {
      $scope.foundWeb3 = false;
    }

    // Methods
    function refresh() {
      $scope.events = [];
      _getEventAtBlock(web3.eth.defaultBlock);
    }

    function addEvent(key, value) {

      $scope.forgetmenot.createEntry(key, value, undefined, undefined, (err, data) => {
          
        if(err) {
          console.log('ERROR', err.message);
        }
       
        console.log('addEvent response', data);
        _getEventAtBlock(undefined);
      });
    }

    function _getEventAtBlock(blocknumber) {
      $scope.forgetmenot.fetchEntry(undefined, undefined, blocknumber, (err, data) => {
          
        if(err) {
          console.log(`ERROR @ ${blocknumber}`, err.message);
        }

        console.log('_getEventAtBlock response', data);

        if(data[2].toNumber() !== data[3].toNumber()) {
          $scope.events.push(event(data[0], data[1], data[2].toNumber(), data[3].toNumber()));
          if(data[3].toNumber() !== 0) {
            _getEventAtBlock(data[3].toNumber());
          } else {
            $scope.$digest();
          }
        }



      });
    }

  }


})();