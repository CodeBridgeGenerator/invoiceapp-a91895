
    module.exports = function (app) {
        const modelName = 'invoices';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceID: { type:  String , required: true, minLength: null, maxLength: null },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
invoiceDate: { type: Date, required: false },
dueDate: { type: Date, required: false },
paymentTermsID: { type: Schema.Types.ObjectId, ref: "payment_terms" },
Tax: { type:  String , minLength: null, maxLength: null },
discount: { type:  String , minLength: null, maxLength: null },
totalAmount: { type: Number, required: false, max: 1000000 },
subTotal: { type:  String , minLength: null, maxLength: null },
remarks: { type:  String , required: true, minLength: null, maxLength: null },
customerPoid: { type: Schema.Types.ObjectId, ref: "purchase_order" },
commercialStatement: { type:  String , required: true },
bankAccountNumber: { type:  String , required: true },
bankName: { type:  String , required: true },

            
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