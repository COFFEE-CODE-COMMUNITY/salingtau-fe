// Type declarations for Midtrans Snap
interface SnapPaymentCallbacks {
  onSuccess?: (result: any) => void;
  onPending?: (result: any) => void;
  onError?: (result: any) => void;
  onClose?: () => void;
}

interface MidtransSnap {
  pay(snapToken: string, callbacks?: SnapPaymentCallbacks): void;
}

interface Window {
  snap: MidtransSnap;
}
