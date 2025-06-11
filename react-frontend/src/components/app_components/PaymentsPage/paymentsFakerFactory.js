
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentID: faker.lorem.sentence(""),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
paymentMethod: faker.lorem.sentence(""),
dateIssued: faker.datatype.number(""),
totalAmount: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
