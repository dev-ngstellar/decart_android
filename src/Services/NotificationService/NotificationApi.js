import API from "../../Api/Api";
import { GET_NOTIFICATION_COUNT, GET_NOTIFICATIONS, UPDATE_NOTIFICATION_STATUS } from "../../Api/ApiPath";

export const NotificationApi = payload => {
  console.log("API CALL - NotificationApi Payload:", payload);
  console.log("API CALL - NotificationApi URL:", GET_NOTIFICATIONS);
  const api = API.post(GET_NOTIFICATIONS, payload);
  const response = api.then(res => res.data);
  return response;
};
 

export const UpdateNotification = payload => {
  console.log("API CALL - UpdateNotification Payload:", payload);
  console.log("API CALL - UpdateNotification URL:", UPDATE_NOTIFICATION_STATUS);
  const api = API.post(UPDATE_NOTIFICATION_STATUS, payload);
  const response = api.then(res => res.data);
  return response;
};


export const GetNotificationCount = payload => {
  console.log("API CALL - GetNotificationCount Payload:", payload);
  console.log("API CALL - GetNotificationCount URL:", GET_NOTIFICATION_COUNT);
  const api = API.post(GET_NOTIFICATION_COUNT, payload);
  const response = api.then(res => res.data);
  return response;
};