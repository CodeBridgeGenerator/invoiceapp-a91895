
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,paymentTermsIDIds,quotationIDIds,quotationItemIds,customerPoidIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
invoiceID: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
invoiceDate: faker.lorem.sentence(""),
dueDate: faker.lorem.sentence(""),
paymentTermsID: paymentTermsIDIds[i % paymentTermsIDIds.length],
quotationID: quotationIDIds[i % quotationIDIds.length],
Tax: faker.datatype.number(""),
discount: faker.datatype.number(""),
totalAmount: faker.datatype.number(""),
subTotal: faker.datatype.number(""),
remarks: faker.lorem.sentence(""),
quotationItem: quotationItemIds[i % quotationItemIds.length],
customerPoid: customerPoidIds[i % customerPoidIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
