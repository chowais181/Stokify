import faker from "faker";
import { name } from "faker/locale/ar";
import { sample } from "lodash";
// utils
import { mockImgAvatar } from "../utils/mockImages";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  website: faker.internet.url(),
  name: faker.name.findName(),
  email: faker.internet.email(name),
  phoneNumber: faker.phone.phoneNumber(),
  role: sample([
    "Admin",
    "Stock Manager",
    "Coordinator",
    "Vendor",
    "Staff",
    "Faculty",
    "Student",
  ]),
}));

export default users;
