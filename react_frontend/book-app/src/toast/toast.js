import { toast } from "react-toastify";
const toasting = (type,message) => {
    switch (type) {
        case "error":
            toast.error(message, {
                autoClose: 2000,
                hideProgressBar: true,
              });
              break
        case "success":
            toast.success(message, {
                autoClose: 2000,
                hideProgressBar: true,
              });
              break
        case "warn":
            toast.warn(message, {
                autoClose: 2000,
                hideProgressBar: true,
              });
              break
        default:
            toast.default(message, {
                autoClose: 2000,
                hideProgressBar: true,
              });

    }
}
export default toasting;
