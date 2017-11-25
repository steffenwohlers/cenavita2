angular.module('cenavita2').controller('ProductsController', ProductsController);

function ProductsController(productDataFactory) {
    var vm = this;
    vm.title = "CenaVita"
    productDataFactory.productList().then(function(response) {
        //console.log(response);
        vm.products = response.data;
    });
}