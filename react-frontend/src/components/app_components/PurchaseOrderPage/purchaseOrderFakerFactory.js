
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,purchaseOrderItemsIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
poId: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
purchaseOrderItems: purchaseOrderItemsIds[i % purchaseOrderItemsIds.length],
poDate: faker.lorem.sentence(""),
remarks: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
