import axios from 'axios';
import { ChatProps } from '../../interfaces';
import { UserAuthHeaders } from '../interfaces';

interface NewChat {
  is_direct_chat?: boolean;
  usernames: string[];
}

export const getOrCreateChat = (
  host: string = 'https://api.chatengine.io',
  headers: UserAuthHeaders,
  data: NewChat,
  callback: (chat: ChatProps) => void
) => {
  axios
    .put(`${host}/chats/`, data, {
      headers,
    })

    .then((response) => {
      callback && callback(response.data);
    })

    .catch((error) => {
      console.log('Get or Create Chat Error', error);
    });
};