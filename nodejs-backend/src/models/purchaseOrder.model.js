
    module.exports = function (app) {
        const modelName = 'purchase_order';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            poId: { type:  String , required: true },
customerID: { type: Schema.Types.ObjectId, ref: "companies" },
purchaseOrderItems: { type: Schema.Types.ObjectId, ref: "purchaseorder_items" },
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