var express= require('express');
var mongoose= require('mongoose');
var bodyParser= require('body-parser')
var {vehicleModel}= require('./model/vehicle');

var apps= express();

apps.use(bodyParser.json());
apps.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/vehicledb?retryWrites=true&w=majority",{useNewUrlParser: true})


apps.post('/addvehicle', async (req,res)=>{
    try
    {
        var data= req.body;
        console.log(data)
        var data= new vehicleModel(req.body);
        var result= await data.save();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error)
    }
})




apps.get('/createvehicle', async(req,res)=>{
    try
    {
        //var data= req.body;
        var data= new vehicleModel(req.body);
    
        var result = await data.save();
        res.json(result);
    } 
    catch(error){
        res.status(500).send(error);
    }
})

apps.get('/viewall',async(req, res)=>{
    try
    {
       var result= await vehicleModel.find().exec();
       res.json(result);
    }
    catch(error){
     res.status(500).send(error)
    }
})

apps.post('/search',async(req,res)=>{

    try
    {
       vehicleModel.find(req.body, (error,data)=>{
           if(error){throw error}
           else{res.json(data)};
       })
    }
    catch(error){res.status(500).send(error)}
})

apps.post('/delete', async(req,res)=>{
    try
    {
        vehicleModel.findByIdAndDelete(req.body.id,
            (error,data)=>{
                if(error){res.send(error)}
                else{res.json({'status':'Success'})};
            })
    }
    catch(error){res.status(500).send(error)}
})

apps.post('/update',async(res,req)=>{
    try
    {
        vehicleModel.findByIdAndUpdate(req.body.id, {
            vehicleNo:req.body.vehicleNo,manufacturerName:req.body.manufacturerName,
            manufacturingYear:req.body.manufacturingYear,modelName:req.body.modelName,
            ownerName:req.body.ownerName,ownerAddress:req.body.ownerAddress,
            ownerPhoneno:req.body.ownerPhoneno,dealerName:req.body.dealerName,
            dealerPhoneno:req.body.dealerPhoneno
        },(error,data)=>{
            if (error){throw error}
            else{res.json({'status':'success'})};
        }   
        )
    }
    catch(error){
        res.status(500).send(error)
    }
})



apps.listen(process.env.PORT || 3000,function(){
    console.log ("Node Server running fine!!!!")
})