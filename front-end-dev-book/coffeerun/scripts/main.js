(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTR = '[data-coffee-order="checklist"]';
  // 远程测试
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var myTruck = new Truck('ncc-1701', new DataStore());
  //var myTruck = new Truck('ncc-1701', new RemoteDataStore(SERVER_URL));
  window.myTruck = myTruck;
  var checkList = new CheckList(CHECKLIST_SELECTR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  var formHandler = new FormHandler(FORM_SELECTOR);

  // 通过promise优化
  // formHandler.addSubmitHandler(function(data){
  //   myTruck.createOrder.call(myTruck,data);
  //   checkList.addRow.call(checkList,data);
  // });
  formHandler.addSubmitHandler(function(data){
    return myTruck.createOrder.call(myTruck,data)
    .then(function(){
      console.log('addRow promise');
      checkList.addRow.call(checkList,data);
    },
    function(){
      console.log('Server unreachable. Try again later.');
    }
  );
  });
  console.log(formHandler);

  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
