import { useReducer, useMemo } from 'react';
import './OrderTracker.css';

const initialState = {
  status: 'idle', // idle | loading | processing | delivered | cancelled
  order: null,
  error: null,
  history: [], // Array of previous statuses with timestamps
  createdAt: null,
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'PLACE_ORDER':
      return { ...state, status: 'loading', error: null, createdAt: new Date() };
    case 'ORDER_CONFIRMED':
      return {
        ...state,
        status: 'processing',
        order: action.payload,
        history: [...state.history, { status: 'processing', time: new Date() }]
      };
    case 'ORDER_DELIVERED':
      return {
        ...state,
        status: 'delivered',
        history: [...state.history, { status: 'delivered', time: new Date() }]
      };
    case 'CANCEL_ORDER':
      return { ...state, status: 'cancelled', error: action.payload };
    default:
      return state;
  }
}

const useOrderStatus = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const placeOrder = () => {
    dispatch({ type: 'PLACE_ORDER' });
    // Simulate API call
    setTimeout(() => {
      dispatch({ type: 'ORDER_CONFIRMED', payload: { id: '12345', item: 'React Development' } });
    }, 2000);
  };

  const confirmOrder = () => {
    // For manual trigger if needed
  };

  const deliverOrder = () => {
    dispatch({ type: 'ORDER_DELIVERED' });
  };

  const cancelOrder = () => {
    dispatch({ type: 'CANCEL_ORDER', payload: 'Order cancelled by user' });
  };

  return { state, placeOrder, confirmOrder, deliverOrder, cancelOrder };
};

const OrderTracker = () => {
  const { state, placeOrder, deliverOrder, cancelOrder } = useOrderStatus();

  const estimatedCompletionTime = useMemo(() => {
    if (!state.createdAt) return null;
    const now = new Date();
    const elapsed = now - state.createdAt;
    let additionalTime = 0;

    switch (state.status) {
      case 'loading':
        additionalTime = 2 * 60 * 1000; // 2 minutes
        break;
      case 'processing':
        additionalTime = 5 * 60 * 1000; // 5 minutes
        break;
      case 'delivered':
        return 'Completed';
      default:
        return null;
    }

    const completion = new Date(state.createdAt.getTime() + elapsed + additionalTime);
    return completion.toLocaleTimeString();
  }, [state.status, state.createdAt]);

  const steps = ['idle', 'loading', 'processing', 'delivered'];
  const currentStepIndex = steps.indexOf(state.status);

  return (
    <div className="order-tracker">
      <h3>Exercise 4: Order Status State Machine</h3>
      <div className="status-display">
        Current Status: <strong>{state.status}</strong>
        {state.order && <div>Order: {state.order.item} (ID: {state.order.id})</div>}
        {state.error && <div className="error">Error: {state.error}</div>}
        {estimatedCompletionTime && (
          <div>Estimated Completion: {estimatedCompletionTime}</div>
        )}
      </div>

      <div className="timeline">
        {steps.map((step, index) => (
          <div key={step} className={`step ${index <= currentStepIndex ? 'completed' : ''}`}>
            <div className="circle">{index + 1}</div>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="buttons">
        {state.status === 'idle' && (
          <button onClick={placeOrder}>Place Order</button>
        )}
        {state.status === 'processing' && (
          <button onClick={deliverOrder}>Mark as Delivered</button>
        )}
        {(state.status === 'idle' || state.status === 'processing') && (
          <button onClick={cancelOrder}>Cancel Order</button>
        )}
      </div>

      <div className="history">
        <h4>Status History</h4>
        <ul>
          {state.history.map((entry, index) => (
            <li key={index}>
              {entry.status} at {entry.time.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTracker;