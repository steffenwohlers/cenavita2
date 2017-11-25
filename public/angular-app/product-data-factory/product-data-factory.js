angular.module('cenavita2').factory('productDataFactory', productDataFactory);

function productDataFactory($http) {
    return {
        productList : productList,
        productDisplay: productDisplay
    };

    function productList() {
        return $http.get('/api/products').then(complete).catch(failed);

    };

    function productDisplay(id) {
        return $http.get('api/products/' + id).then(complete).catch(failed);

    }

    function complete (response) {
        return response;
    }

    function failed(error) {
        console.log(error.statusText);
    } 
};