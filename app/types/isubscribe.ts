export interface INotification {
  _id: string;
  message: {
    title: string;
    startTime: Date;
    duration: number;
  }
  organizer: string;
}

export interface ISubscribe {
  key: string;
  cluster: string;
  setNotifications: (updateFn: (prev: INotification[]) => INotification[]) => void;
  username: string;
  email: string;
}