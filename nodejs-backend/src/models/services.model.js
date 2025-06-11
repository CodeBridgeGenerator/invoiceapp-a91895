
    module.exports = function (app) {
        const modelName = 'services';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceID: { type:  String , required: true, minLength: null, maxLength: null },
name: { type:  String , required: true },
serviceType: { type:  String , required: true },
price: { type: Number, required: false, max: 10000000 },
description: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };