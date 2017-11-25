angular.module('cenavita2').controller('ProductController', ProductController);

function ProductController($routeParams, productDataFactory) {
    var vm = this;
    var id = $routeParams.id;
    productDataFactory.productDisplay(id).then(function(response) {
        vm.product = response.data;
    })
};