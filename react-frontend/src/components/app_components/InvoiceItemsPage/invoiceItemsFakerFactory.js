
import { faker } from "@faker-js/faker";
export default (user,count,serviceIds,invoiceIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
service: serviceIds[i % serviceIds.length],
invoiceId: invoiceIdIds[i % invoiceIdIds.length],
price: faker.lorem.sentence(1),
quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
