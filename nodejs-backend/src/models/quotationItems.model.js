
    module.exports = function (app) {
        const modelName = 'quotation_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationID: { type: Schema.Types.ObjectId, ref: "quotations" },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },
service: { type: Schema.Types.ObjectId, ref: "services" },
price: { type: Number, required: false, max: 1000000 },
quantity: { type:  String , required: true, maxLength: null },
milestoneLabel: { type:  String , required: true, maxLength: null },
description: { type:  String , required: true, maxLength: null },

            
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