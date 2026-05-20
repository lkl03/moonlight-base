declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

interface PayPalNamespace {
  Buttons(options: PayPalButtonsComponentOptions): PayPalButtonsComponent;
}

interface PayPalButtonsComponent {
  isEligible(): boolean;
  render(container: HTMLElement | string): Promise<void>;
  close(): Promise<void>;
}

interface PayPalButtonsComponentOptions {
  createSubscription?: (
    data: Record<string, unknown>,
    actions: PayPalSubscriptionActions
  ) => Promise<string>;
  onApprove?: (
    data: PayPalOnApproveData,
    actions: Record<string, unknown>
  ) => void | Promise<void>;
  onError?: (err: Record<string, unknown>) => void;
  onCancel?: (data: Record<string, unknown>) => void;
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay' | 'subscribe' | 'donate';
    height?: number;
    tagline?: boolean;
  };
}

interface PayPalSubscriptionActions {
  subscription: {
    create(options: { plan_id: string; quantity?: number }): Promise<string>;
  };
}

interface PayPalOnApproveData {
  orderID: string;
  subscriptionID: string;
  payerID?: string;
  facilitatorAccessToken?: string;
}

export {};
