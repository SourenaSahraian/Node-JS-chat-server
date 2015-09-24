var http = require('http')
var bl = require('bl')
var async=require(async);


var arg2=process.argv[2];
var arg3=process.argv[3];
var arg4=process.argv[4]

var count=0
var arg2Result;
var arg3Result;
var arg4Result;



http.get(arg2, function (response) {
    response.pipe(bl(function (err, data) {
        if (err)
            return console.error(err)

        data = data.toString()
        arg2Result=data;

        ;
        count++;
        print();
    }))
})

http.get(arg3, function (response) {
    response.pipe(bl(function (err, data) {
        if (err)
            return console.error(err)
        data = data.toString()


        arg3Result=data;
        count++;
        print();
    }))
})


http.get(arg4, function (response) {
    response.pipe(bl(function (err, data) {
        if (err)
            return console.error(err)
        data = data.toString()

        arg4Result=data;
        print();
        count++;
    }))
})


function print(){

    if(count == 3){
        console.log("hi watch")
        console.log(arg2Result);
        console.log(arg3Result);
        console.log(arg4Result);
    }
}






