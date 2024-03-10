import { roles } from "../../middleware/auth.js";

const userEndPoints={
    create:[roles.Admin],
    update:[roles.Admin,roles.User],
    delete:[roles.Admin,roles.User],
    get:[roles.Admin,roles.User],
}
export default userEndPoints