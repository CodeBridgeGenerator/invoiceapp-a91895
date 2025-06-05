
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
quotationID: { type: Schema.Types.ObjectId, ref: "quotations" },
Tax: { type:  String , minLength: null, maxLength: null },
discount: { type:  String , minLength: null, maxLength: null },
totalAmount: { type: Number, required: false, max: 1000000 },
subTotal: { type:  String , minLength: null, maxLength: null },
remarks: { type:  String , required: true, minLength: null, maxLength: null },
quotationItem: { type: Schema.Types.ObjectId, ref: "quotation_items" },
customerPoid: { type: Schema.Types.ObjectId, ref: "purchase_order" },

            
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