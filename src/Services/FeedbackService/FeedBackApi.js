import API from "../../Api/Api";
import { FEEDBACK_TYPE, GET_FEEDBACK } from "../../Api/ApiPath";

export const FeedBackTypeApi = () => {
    const api = API.post(FEEDBACK_TYPE);
    const response = api.then(res => res.data);
    return response;
  };

  export const GetFeedBackApi = payload => {
    const api = API.post(GET_FEEDBACK, payload);
    const response = api.then(res => res.data);
    return response;
  };
  