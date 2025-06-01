import { ISubscribe } from '@/app/types/isubscribe';
import Pusher from 'pusher-js';
import { toast } from 'react-hot-toast';
import { INotification } from '@/app/types/isubscribe';

export const subscribe = async (subscriber: ISubscribe) => {
  const pusher = new Pusher(subscriber.key, {
    cluster: subscriber.cluster,
  });


  const channel = pusher.subscribe('meetmate-channel');
  channel.bind(subscriber.email, (data: {message: {
    title: string;
    startTime: Date;
    duration: number;
  }, organizer: string}) => {
      toast(
        `${data.message.title} scheduled by ${data.organizer} at ${new Date(data.message.startTime).toLocaleTimeString()} for ${data.message.duration} minutes`,
      );
    
    subscriber.setNotifications((prev: INotification[]) => {
      const newNotification = data as INotification; 
      return [...prev, newNotification];
    });
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}