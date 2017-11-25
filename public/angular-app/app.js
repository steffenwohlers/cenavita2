angular.module('cenavita2', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'angular-app/product-list/products.html',
            controller: ProductsController,
            controllerAs: 'vm'
        })
        .when('/product/:id', {
            templateUrl: 'angular-app/product-display/product.html',
            controller: ProductController,
            controllerAs: 'vm'
        });
        
}