
import { faker } from "@faker-js/faker";
export default (user,count,customerIDIds,quotationItemsIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationID: faker.lorem.sentence(""),
customerID: customerIDIds[i % customerIDIds.length],
quotationDate: faker.lorem.sentence(""),
quotationItems: quotationItemsIds[i % quotationItemsIds.length],
discountType: faker.lorem.sentence(1),
discountValue: faker.lorem.sentence(1),
remarks: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
