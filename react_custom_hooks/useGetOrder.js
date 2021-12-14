import { useEffect, useState } from 'react';

// API call to get data
async function getOrder(id) {
  const res = await fetch('./order.json');
  const data = await res.json();
  return data;
}

// unmount Function
async function unMountFn(data) {
  // handle any cleanup process
}

// hook definition
function useGetOrder(input) {
  const { id } = input;

  // component state creation
  const [orderId, setOrderId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
  const [hookData, setHookData] = useState(undefined);

  // Function to run on first load
  useEffect(() => {
    setIsLoading(true);

    // fetch data
    const fetchData = async () => {
      let orderData;
      try {
        orderData = await getOrder(orderId);
      } catch (e) {
        throw Error(e);
      }
      setHookData(orderData);
      setIsLoading(false);
    };

    fetchData();

    // handle cleanup
    return async () => {
      await unMountFn();
    };
  }, [orderId]);

  // hooks return array
  return [{ isLoading, hookData }, setOrderId];
}

// export hooks
export { useGetOrder };
