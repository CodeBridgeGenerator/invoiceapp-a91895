
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerPoId: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
poDate: faker.lorem.sentence(""),
remarks: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
