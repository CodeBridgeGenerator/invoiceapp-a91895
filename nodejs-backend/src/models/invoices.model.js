
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type:  String , required: true },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
invoiceDate: { type: Date, required: false },
invoiceItems: { type: Schema.Types.ObjectId, ref: "invoice_items" },
dueDate: { type: Date, required: false },
paymentTermsID: { type: Schema.Types.ObjectId, ref: "payment_terms" },
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