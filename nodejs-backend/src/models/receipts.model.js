
    module.exports = function (app) {
        const modelName = 'receipts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            transactionID: { type:  String , required: true, maxLength: null },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },
receiptDetails: { type:  String , required: true },
dateIssued: { type: Date, required: false },
totalAmount: { type: Number, required: false, max: 10000000 },

            
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