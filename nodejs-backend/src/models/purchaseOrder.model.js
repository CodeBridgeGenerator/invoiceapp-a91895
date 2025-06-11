
    module.exports = function (app) {
        const modelName = 'purchase_order';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerPoId: { type:  String , required: true, minLength: null, maxLength: null },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
poDate: { type: Date, required: false },
remarks: { type:  String , required: true },

            
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