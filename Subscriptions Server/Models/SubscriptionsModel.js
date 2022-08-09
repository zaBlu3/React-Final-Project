const {Schema,model} = require("mongoose")



const subscriptionSchema = new Schema({

    memberId : {
        type : Schema.Types.ObjectId, ref:"Member",
        required :true,
        immutable : true,
    },

    movies : {
        type : [{movieId : {type : Schema.Types.ObjectId,ref:"Movie"}, date : {type :Date,default : Date.now}, _id: false}],
        required :true,
    },

    
},{ versionKey: false})

subscriptionSchema.statics.findByMemberId = async function (id) {
    const {memberId} = await this.findOne().where("memberId").equals(id).populate("memberId").select("memberId.$ -_id")
   return memberId;
}
subscriptionSchema.static("alreadySubscribed", function (id,movieId){
    return this.findById(id).where("movies.movieId").equals(movieId) 

})

  
  
   


module.exports = model('Subscription' , subscriptionSchema);;
