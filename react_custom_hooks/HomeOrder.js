import React from 'react';
import { useGetOrder } from './useGetOrder';

const HomeOrder = () => {
  const [{ isLoading, hookData }, setOrderID] = useGetOrder(123);

  return (
    <div>
      <h3>Home Order</h3>
      {isLoading && <p>Fetching order ⏳</p>}
      {hookData && (
        <div>
          <p>ID: {hookData.id}</p>
          <p>Payment Captured: {hookData.paymentCaptured ? 'True' : 'False'}</p>
          <p>Amount: ${hookData.totalAmount}</p>
          <p>Shipping Fee: ${hookData.shippingFee}</p>
          <p>Shipping Address: {hookData.shippingAddress}</p>
          <p>User ID: {hookData.userId}</p>
          <h4>Order Items</h4>
          {hookData.products.map((product, key) => (
            <div key={key}>
              <p>
                {product.title} - ${product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { HomeOrder };
