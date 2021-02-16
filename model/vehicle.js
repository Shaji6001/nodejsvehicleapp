var mongoose= require("mongoose");

var vehicleSchema= new mongoose.Schema(
    {
    vehicleNo:{type:String},
    manufacturerName:{type:String},
    manufacturingYear:{type:String},
    modelName:{type:String},
    ownerName:{type:String},
    ownerAddress:{type:String},
    ownerPhoneno:{type:String},
    dealerName:{type:String},
    dealerPhoneno:{type:String}
}
);
var vehicleModel= new mongoose.model("vehicles",vehicleSchema);

module.exports ={vehicleModel}