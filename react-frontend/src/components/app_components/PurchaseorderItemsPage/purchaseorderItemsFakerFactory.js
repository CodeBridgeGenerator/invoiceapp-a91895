
import { faker } from "@faker-js/faker";
export default (user,count,serviceIds,poIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
service: serviceIds[i % serviceIds.length],
poId: poIdIds[i % poIdIds.length],
price: faker.datatype.number(""),
quantity: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
