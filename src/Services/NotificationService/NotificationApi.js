import API from "../../Api/Api";
import { GET_NOTIFICATION_COUNT, GET_NOTIFICATIONS, UPDATE_NOTIFICATION_STATUS } from "../../Api/ApiPath";

export const NotificationApi = payload => {
  console.log('Notification payload',payload);
  const api = API.post(GET_NOTIFICATIONS, payload);
   console.log('paylod',payload);
   const response = api.then(res => res.data);
   console.log('notification data',response)
  return response;
};
 

export const UpdateNotification = payload => {
  const api = API.post(UPDATE_NOTIFICATION_STATUS, payload);
  const response = api.then(res => res.data);
  return response;
};


export const GetNotificationCount = payload => {
  const api = API.post(GET_NOTIFICATION_COUNT, payload);
  const response = api.then(res => res.data);
  return response;
};