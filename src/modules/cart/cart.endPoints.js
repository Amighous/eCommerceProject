import { roles } from "../../middleware/auth.js";

const cartEndPoints={
    cart:[roles.User],
}
export default cartEndPoints