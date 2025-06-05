
import { faker } from "@faker-js/faker";
export default (user,count,paymentIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
receiptID: faker.datatype.number(""),
paymentID: paymentIDIds[i % paymentIDIds.length],
dateIssued: faker.datatype.number(""),
totalAmount: faker.datatype.number(""),
receiptDetails: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
