import axios from "axios";

export async function getAllOrders() {
    
  const res = await axios.get(`http://localhost:5000/api/order/?`);
  return res.data;
}

