
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentTermID: faker.lorem.sentence(""),
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
