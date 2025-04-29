export interface ISubscribe {
  key: string;
  cluster: string;
  setNotifications: (notification: any) => void;
  userId: string;
}