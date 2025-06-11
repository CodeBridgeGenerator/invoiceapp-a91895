
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,paymentTermsIDIds,customerPoidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
invoiceDate: faker.lorem.sentence(""),
dueDate: faker.lorem.sentence(""),
paymentTermsID: paymentTermsIDIds[i % paymentTermsIDIds.length],
Tax: faker.datatype.number(""),
discount: faker.datatype.number(""),
totalAmount: faker.datatype.number(""),
subTotal: faker.datatype.number(""),
remarks: faker.lorem.sentence(""),
customerPoid: customerPoidIds[i % customerPoidIds.length],
commercialStatement: faker.lorem.sentence(""),
bankAccountNumber: faker.lorem.sentence(""),
bankName: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
