
    module.exports = function (app) {
        const modelName = 'credit_note';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            creditNoteID: { type:  String , required: true, minLength: null, maxLength: null },
invoiceID: { type: Schema.Types.ObjectId, ref: "invoices" },
issueDate: { type: Date, required: false },
reason: { type:  String , required: true },

            
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