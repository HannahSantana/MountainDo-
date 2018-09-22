var url = "/data";

function get_data(){
    response = d3.json(url).then(function(response){
        
        return response
    })
    return response
}

ski_table = get_data()

console.log(ski_table)


ski_table.then(function(result) {
    console.log(result)// here you can use the result of promiseB
});