
import { faker } from "@faker-js/faker";
export default (user,count,invoiceIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
debitNoteID: faker.datatype.number(""),
invoiceID: invoiceIDIds[i % invoiceIDIds.length],
issueDate: faker.datatype.number(""),
reason: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
