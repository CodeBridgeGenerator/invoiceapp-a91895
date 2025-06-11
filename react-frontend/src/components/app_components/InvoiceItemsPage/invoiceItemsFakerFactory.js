
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIdIds,serviceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceId: invoiceIdIds[i % invoiceIdIds.length],
service: serviceIds[i % serviceIds.length],
price: faker.lorem.sentence(""),
quantity: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
