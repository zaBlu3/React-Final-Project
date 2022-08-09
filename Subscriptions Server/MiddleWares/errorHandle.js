module.exports = function(err,req,res,next)
{   
   if(err.path === "_id")
        return res.status(400).json("ID is not correct , check ID")
    res.status(500).json(err.message)    
}