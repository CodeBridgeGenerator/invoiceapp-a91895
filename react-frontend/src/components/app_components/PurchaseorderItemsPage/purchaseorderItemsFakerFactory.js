
import { faker } from "@faker-js/faker";
export default (user,count,customerPoIdIds,serviceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerPoId: customerPoIdIds[i % customerPoIdIds.length],
service: serviceIds[i % serviceIds.length],
price: faker.datatype.number(""),
quantity: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
