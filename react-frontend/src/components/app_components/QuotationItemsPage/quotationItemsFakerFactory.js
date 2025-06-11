
import { faker } from "@faker-js/faker";
export default (user,count,quotationIDIds,invoiceIDIds,serviceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationID: quotationIDIds[i % quotationIDIds.length],
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
service: serviceIds[i % serviceIds.length],
price: faker.lorem.sentence(""),
quantity: faker.lorem.sentence(""),
milestoneLabel: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
