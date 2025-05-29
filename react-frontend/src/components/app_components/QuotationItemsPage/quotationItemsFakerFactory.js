
import { faker } from "@faker-js/faker";
export default (user,count,serviceIds,quotationIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
service: serviceIds[i % serviceIds.length],
quotationID: quotationIDIds[i % quotationIDIds.length],
price: faker.lorem.sentence(""),
quantity: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
