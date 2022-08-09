module.exports = function(err,req,res,next)
{   
   const errors = {error : err.message}
    res.status(500).json({errors})    
}