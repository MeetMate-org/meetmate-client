export interface INotification {
  _id: string;
  message: {
    title: string;
    startTime: Date;
    endTime: Date;
  }
  organizer: string;
}

export interface ISubscribe {
  key: string;
  cluster: string;
  setNotifications: (updateFn: (prev: INotification[]) => INotification[]) => void;
  userId: string;
  email: string;
}