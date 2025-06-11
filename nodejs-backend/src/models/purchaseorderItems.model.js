
    module.exports = function (app) {
        const modelName = 'purchaseorder_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerPoId: { type: Schema.Types.ObjectId, ref: "purchase_order" },
service: { type: Schema.Types.ObjectId, ref: "services" },
price: { type: Number, required: false, max: 10000000 },
quantity: { type:  String , required: true },
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