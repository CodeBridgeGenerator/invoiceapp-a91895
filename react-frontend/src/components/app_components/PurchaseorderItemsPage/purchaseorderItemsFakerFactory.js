
import { faker } from "@faker-js/faker";
export default (user,count,poIdIds,serviceIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
poId: poIdIds[i % poIdIds.length],
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
