"use strict";var app=angular.module("smallBusinessApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]);app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"AuthCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl"}).when("/customers",{templateUrl:"views/customers.html",controller:"CustomersCtrl"}).when("/orders",{templateUrl:"views/orders.html",controller:"OrdersCtrl"}).when("/orders/:orderId",{templateUrl:"views/showorder.html",controller:"OrderViewCtrl"}).when("/servicereports",{templateUrl:"views/servicereports.html"}).when("/contacts",{templateUrl:"views/contacts.html",controller:"ContactsCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/users/:username",{templateUrl:"views/profile.html",controller:"ProfileCtrl"}).otherwise({redirectTo:"/"})}]),app.constant("FIREBASE_URL","https://smallbusiness.firebaseio.com/"),app.run(function(){}),app.controller("AuthCtrl",["$scope","$location","Auth","User",function(a,b,c,d){c.signedIn()&&(console.info("signedIn"),b.path("/")),a.$on("$firebaseSimpleLogin:login",function(){b.path("/")}),a.login=function(){a.user?c.login(a.user).then(function(){b.path("/")},function(b){a.error=b.toString()}):a.error="Please specify a user name and a password"},a.register=function(){c.register(a.user).then(function(c){d.create(c,a.user.username),b.path("/")},function(b){a.error=b.toString()})}}]),app.controller("NavCtrl",["$scope","$location","Auth",function(a,b,c){a.logout=function(){c.logout()}}]),app.controller("OrdersCtrl",["$scope","$location","Order",function(a,b,c){"/orders"===b.path()&&(a.orders=c.all);var d=new Date;a.orderPlaceholder={url:"http://",title:""},a.orderPlaceholder={customer:"",title:"",date:d,delivery:""},a.order=a.orderPlaceholder,a.submitOrder=function(){c.create(a.order).then(function(c){a.order=a.orderPlaceholder,b.path("/orders/"+c)})},a.deleteOrder=function(a){c.delete(a)}}]),app.controller("CustomersCtrl",["$scope","$location","Customer",function(a,b,c){console.info("customers controller..."),console.info("$scope.customer:",a.customer),a.customers=c.all,console.log("$scope.customers:",a.customers),a.customerPlaceholder={name:"name",address:"address"},a.customer=a.customerPlaceholder,a.submitCustomer=function(){console.log("submitCustomer in CustomersCtrl:",a.customer),c.create(a.customer).then(function(b){a.customer=a.customerPlaceholder,console.log("customerId: ",b)})},a.deleteCustomer=function(a){c.delete(a)}}]),app.controller("ServicereportsCtrl",["$scope","$location","Servicereport",function(a,b,c){"/servicereports"===b.path()&&(a.servicereports=c.all);var d=new Date;a.servicereportPlaceholder={customer:"",title:"",date:d,text:""},a.servicereport=a.servicereportPlaceholder,a.submitServicereport=function(){c.create(a.servicereport).then(function(){a.servicereport=a.servicereportPlaceholder})},a.deleteServicereport=function(a){c.delete(a)}}]),app.controller("ContactsCtrl",function(){}),app.controller("AboutCtrl",function(){}),app.controller("OrderViewCtrl",["$scope","$routeParams","Order",function(a,b,c){a.order=c.find(b.orderId),a.addItem=function(){c.addItem(b.orderId,a.item),a.item=""},a.deleteItem=function(b,d){c.deleteItem(a.order,b,d)}}]),app.controller("ProfileCtrl",["$scope","$routeParams","Order","User",function(a,b,c,d){function e(){a.orders={},angular.forEach(a.user.orders,function(b){a.orders[b]=c.find(b)})}function f(){a.items={},angular.forEach(a.user.items,function(b){var d=c.find(b.orderId);d.$on("loaded",function(){a.items[b.id]=d.$child("items").$child(b.id),a.ordersWithItems[b.orderId]=d})})}a.user=d.findByUsername(b.username),a.ordersWithItems={},a.user.$on("loaded",function(){e(),f()})}]),app.factory("Auth",["$firebaseSimpleLogin","FIREBASE_URL","$rootScope",function(a,b,c){var d=new Firebase(b),e=a(d),f={register:function(a){return e.$createUser(a.email,a.password)},signedIn:function(){return null!==e.user?!0:!1},login:function(a){return e.$login("password",{email:a.email,password:a.password,rememberMe:!0})},logout:function(){e.$logout()}};return c.signedIn=function(){return f.signedIn()},f}]),app.factory("Order",["$firebase","FIREBASE_URL","User",function(a,b,c){var d=new Firebase(b+"orders"),e=a(d),f={all:e,create:function(a){if(c.signedIn()){var b=c.getCurrent();return a.owner=b.username,e.$add(a).then(function(a){var c=a.name();return b.$child("orders").$child(c).$set(c),c})}},find:function(a){return e.$child(a)},"delete":function(a){if(c.signedIn()){var b=f.find(a);b.$on("loaded",function(){var d=c.findByUsername(b.owner);e.$remove(a).then(function(){d.$child("orders").$remove(a)})})}},addItem:function(a,b){if(c.signedIn()){var d=c.getCurrent();b.username=d.username,b.orderId=a,e.$child(a).$child("items").$add(b).then(function(b){d.$child("items").$child(b.name()).$set({id:b.name(),orderId:a})})}},deleteItem:function(a,b,d){if(c.signedIn()){var e=c.findByUsername(b.username);a.$child("items").$remove(d).then(function(){e.$child("items").$remove(d)})}}};return f}]),app.factory("Customer",["$firebase","FIREBASE_URL","User",function(a,b){var c=new Firebase(b+"customers"),d=a(c),e={all:d,create:function(a){return d.$add(a).then(function(a){var b=a.name();return b})},find:function(a){return d.$child(a)},findByCustomername:function(a){return a?d.$child(a):void 0},"delete":function(a){var b=e.find(a);b.$on("loaded",function(){d.$child(a).$set({deleted:!0})})}};return e}]),app.factory("Servicereport",["$firebase","FIREBASE_URL","User",function(a,b,c){var d=new Firebase(b+"servicereports"),e=a(d),f={all:e,create:function(a){if(c.signedIn()){var b=c.getCurrent();return a.owner=b.username,e.$add(a).then(function(a){var c=a.name();return b.$child("servicereports").$child(c).$set(c),c})}},find:function(a){return e.$child(a)},set:function(a,b){c.signedIn()&&d.child(a).set(b)},setAttribute:function(a,b){c.signedIn()&&d.child(a).attribute.set(b)},"delete":function(a){if(c.signedIn()){var b=f.find(a);b.$on("loaded",function(){var d=c.findByUsername(b.owner);e.$remove(a).then(function(){d.$child("servicereports").$remove(a)})})}}};return f}]),app.factory("User",["$rootScope","$firebase","FIREBASE_URL",function(a,b,c){function d(b){a.currentUser=g.findByUsername(b)}var e=new Firebase(c+"users"),f=b(e),g={create:function(a,b){f[b]={md5_hash:a.md5_hash,username:b,$priority:a.uid},f.$save(b).then(function(){d(b)})},findByUsername:function(a){return a?f.$child(a):void 0},getCurrent:function(){return a.currentUser},signedIn:function(){return void 0!==a.currentUser}};return a.$on("$firebaseSimpleLogin:login",function(a,c){var f=b(e.startAt(c.uid).endAt(c.uid));f.$on("loaded",function(){d(f.$getIndex()[0])})}),a.$on("$firebaseSimpleLogin:logout",function(){delete a.currentUser}),g}]),app.directive("navCollapse",function(){return{restrict:"A",link:function(a,b){var c=!1;b.on("show.bs.collapse",function(){c=!0}),b.on("hide.bs.collapse",function(){c=!1}),b.on("click",function(){c&&"auto"===b.css("overflow-y")&&b.collapse("hide")})}}}),app.directive("autoFillSync",["$timeout",function(a){return{require:"ngModel",link:function(b,c,d,e){var f=c.val();a(function(){var a=c.val();e.$pristine&&f!==a&&e.$setViewValue(a)},500)}}}]),app.directive("autoFocus",["$timeout",function(a){return{scope:{trigger:"@autoFocus"},link:function(b,c){b.$watch("trigger",function(b){"true"===b&&a(function(){c.focus()})})}}}]),app.directive("checkUsername",["User",function(a){var b=/^[^.$\[\]#\/\s]+$/;return{require:"ngModel",link:function(c,d,e,f){f.$parsers.unshift(function(c){return b.test(c)?0===a.findByUsername(c).$getIndex().length?(f.$setValidity("taken",!0),f.$setValidity("invalid",!0),c):(f.$setValidity("taken",!1),void f.$setValidity("invalid",!0)):(f.$setValidity("taken",!0),void f.$setValidity("invalid",""===c))})}}}]),app.directive("equals",function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){if(d){a.$watch(c.ngModel,function(){e()}),c.$observe("equals",function(){e()});var e=function(){var a=d.$viewValue,b=c.equals;d.$setValidity("equals",!(a&&b)||a===b)}}}}}),app.filter("hostnameFromUrl",function(){return function(a){var b=document.createElement("a");return b.href=a,b.hostname}});