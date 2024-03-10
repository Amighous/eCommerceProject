import { roles } from "../../middleware/auth.js";

const orderEndPoints={
    createOrder:[roles.User],
    cancelOrder:[roles.User],
    deliverdOrder:[roles.Admin],
    onWayOrder:[roles.Admin],
    rejectOrder:[roles.Admin],
    allOrders:[roles.Admin,roles.User],
    allUserOrders:[roles.Admin,roles.User],
}
export default orderEndPoints