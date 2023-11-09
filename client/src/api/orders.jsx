import axios from "axios";

export async function getAllOrders() {
  try {
    const res = await axios.get(
      `http://demo4518863.mockable.io/` // mock api
      // `http://localhost:5000/api/order/`
    );
    if (typeof res.data === "string") return JSON.parse(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
