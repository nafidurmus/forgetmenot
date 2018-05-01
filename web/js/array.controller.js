(function () {
  `use strict`;

  angular
    .module('forgetmenot', [])
    .controller('arrayController', arrayController);

    arrayController.$inject = ['arrayFactory'];

  function arrayController(fact) {

    var ctrl = this;

    // Signature
    ctrl.foundWeb3 = false;
    ctrl.web3Version = 0;
    ctrl.initError = false;

    ctrl.coinbase = "";
    ctrl.balance = 0;
    ctrl.events = [];

    ctrl.refresh = refresh;
    ctrl.addEvent = addEvent;

    ctrl.submitted = true;


    // init
    if (typeof web3 !== 'undefined') {

      console.log(`web3js version: ${web3.version.api}`);
      ctrl.foundWeb3 = true;
      ctrl.web3Version = web3.version.api;

      web3 = new Web3(web3.currentProvider);

      fact.Init(web3)
        .then(r => {
          return fact.GetCoinbase();
        })
        .then(coinbase => {
          ctrl.coinbase = coinbase;
          return fact.GetBalance(ctrl.coinbase);
        })
        .then(balance => {
          ctrl.balance = balance;
        })
        .catch(e => {
          initError = e;
        });

    }

    // Methods
    function refresh() {
      ctrl.events = [];
      __recursiveFetch(web3.eth.defaultBlock);
    }

    function __recursiveFetch(block) {

      fact.GetEventAtBlock(block)
        .then(event => {

          if (event.createdBlock !== event.linkToPreviousBlock) {

            if(block == web3.eth.defaultBlock) {
              event.latest = true;
            }

            ctrl.events.push(event);
            
            if (event.linkToPreviousBlock !== 0) {
              __recursiveFetch(event.linkToPreviousBlock);
            }

          }
        });
    }

    function addEvent(newKey, newValue) {
      ctrl.submitted = false;

      fact.AddEvent(newKey, newValue)
      .then( response => {
        ctrl.submitted = true;
      });
    }

  }

})();