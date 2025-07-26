import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderStatusTimeline from "../../Components/OrderStatusTimeline/OrderStatusTimeline";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllOrders() {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setOrders(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  function getOrderStatus(order) {
  if (order.isDelivered) return "Delivered";
  if (order.paymentMethodType === "card") return "Paid";
  return "Confirmed";
}



  if (loading) {
    return (
      <div className="container py-10 text-center text-xl font-bold text-primary">
        Loading Orders...
      </div>
    );
  }

  return (
    <main className="container py-10">
      <h2 className="text-2xl text-primary font-semibold mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2">Order ID: {order.id}</h3>
              <p className="text-sm text-gray-600 mb-2">Order Created: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-sm mb-2"><strong>Total Price:</strong> {order.totalOrderPrice} EGP</p>
              <p className="text-sm mb-2"><strong>Payment Method:</strong> {order.paymentMethodType}</p>

              <h4 className="font-semibold mt-4 mb-2">Items:</h4>
              <ul className="pl-4 list-none">
                {order.cartItems.map((item) => (
                  <li key={item._id} className="flex items-center gap-4 mb-3 border-b pb-2">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <div>
                      <h5 className="font-semibold">{item.product.title}</h5>
                      <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                      <p className="text-sm text-gray-600">Unit Price: {item.price} EGP</p>
                    </div>
                  </li>
                ))}
              </ul>

              <OrderStatusTimeline status={getOrderStatus(order)} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
