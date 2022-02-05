const Task = require('../models/Task');

const createSingleTask = async (req,res)=>{

    try{
        const task =  await Task.create(req.body);
        res.status(201).json({task});
    }catch(error){
        res.status(500).json({msg:error});
    }
}

const getAllTask = async (req,res)=>{
    try{
        const task = await Task.find({});
        if(!task){
            return res.status(404).json({msg:"No record Found"});
        }
        res.status(201).json({data:task});
    }catch(error){
        res.status(500).json({msg:error});
    }
}

const getSingleTask = async  (req,res)=>{
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No record found with id ${taskID}`});
        }
        res.status(201).json({data:task});

    }catch(error){
        res.status(500).json({msg:error});
    }
}

const updateSingleTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params;
       
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,    
        })

        if(!task){
            return res.status(404).json({msg:`No record found with id ${taskID}`}); 
        }
        res.status(201).json({task});
    }catch(error){
        res.status(500).json({msg:error});
    }
}

const deleteSingleTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params;
       
        const task = await Task.findOneAndDelete({_id:taskID});

        if(!task){
            return res.status(404).json({msg:`No record found with id ${taskID}`}); 
        }
        res.status(201).json({task:task});
    }catch(error){
        res.status(500).json({msg:error});
    }
}


module.exports = {
    getAllTask,
    createSingleTask,
    deleteSingleTask,
    updateSingleTask,
    getSingleTask,
};