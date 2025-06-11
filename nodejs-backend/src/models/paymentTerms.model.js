
    module.exports = function (app) {
        const modelName = 'payment_terms';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentTermID: { type:  String , required: true, maxLength: null },
name: { type:  String , required: true },
description: { type:  String , required: true },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },

            
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