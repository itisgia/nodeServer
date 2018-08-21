console.log('has loaded');

$.ajax({
     url:"http://192.168.33.10:5000/allProducts",
     dataType: "json",
     type: "GET",
    success : function (products) {
        console.log(products);
    },
    error: function (error) {
        console.log(error);
        console.log("SONETHING WENT WRONG");
    }
})
