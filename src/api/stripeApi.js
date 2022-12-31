import { messageShowErr } from "../function";
import axiosClient from "./axiosClient";

class StripeApi {
    poststripe = (params) => {
        const url = "/payment";
        return axiosClient
            .post(url, params)
            .then((data) => {
                return data;
            })
            .catch((err) => {
                messageShowErr("Thanh toán thất bại, vui lòng quay lại sau!");
            });
    };
}
const stripeApi = new StripeApi();
export default stripeApi;
