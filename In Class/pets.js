var one = {};
var two = {};
var three = {};
var four = {};

one.storeName = "PetCo";
one.location = "Greenwich Village";
one.products=["cat food", "dog food", "toys"];

two.storeName = "Kitten Kitchen";
two.location = "Greenwich Village";
two.products=["cat food"];

three.storeName = "PetCo";
three.location = "Chelsea";
three.products=["dog food", "toys"];

four.storeName = "City Pups";
four.location = "Chelsea";
four.products=["toys"];

var petStores = [one,two,three,four];
console.log(petStores);

MongoClient.conncet(url, function(err,db){

var collection= db.manhattan(collName);

collection.aggregate (
    [
        {$group : {_id : "$location"}},
        { $project : {storeName: 1}}
        ]
        ).toArray(function(err, docs){
            
        })

