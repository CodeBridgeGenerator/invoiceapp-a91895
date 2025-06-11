
    module.exports = function (app) {
        const modelName = 'quotations';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type:  String , required: true, minLength: null, maxLength: null },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
quotationDate: { type: Date, required: false },
discountType: { type:  String , required: true, minLength: null, maxLength: null },
discountValue: { type:  String , required: true, maxLength: null },
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