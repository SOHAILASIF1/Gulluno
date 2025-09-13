// helper/addToCart.js
import SummaryApi from "../client/src/commen";
import { toast } from "react-toastify";

const addCart = async (e, id, size = null, hasSizes = false) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    if (hasSizes && !size) {
      toast.error("Please select a size first!");
      return;
    }

    const payload = { productId: id };
    if (hasSizes) payload.size = size;

    const fetchData = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const response = await fetchData.json();

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("Something went wrong!");
  }
};

export default addCart;
