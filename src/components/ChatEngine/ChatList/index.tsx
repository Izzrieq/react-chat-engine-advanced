import React from 'react';

import { Props } from './props';
import { styles } from './styles';

import { ChatForm } from './ChatForm';
import { ChatCard } from './ChatCard';

import { RenderTrigger } from '../../Components/RenderTrigger';

import { ChatProps } from '../../../interfaces';
import { getDateTime } from '../../util/dateTime';

import { Spinner } from '../../Components/Spinner';

const readLastMessage = (myUsername: string, chat: ChatProps) => {
  return chat.people.some(
    (chatPerson) =>
      chatPerson.person.username === myUsername &&
      chatPerson.last_read === chat.last_message.id
  );
};

const renderLoading = () => {
  return [...Array(10)].map((_, i) => {
    return <ChatCard key={`chat_${i}`} isLoading={true} />;
  });
};

export const ChatList: React.FC<Props> = (props: Props) => {
  const { activeChatKey = -1 } = props;

  const renderChats = (chats: Array<ChatProps>) => {
    return chats.map((chat, index) => {
      const description =
        chat.last_message.text !== null ? chat.last_message.text : 'Say hello!';
      const timeStamp = getDateTime(chat.created).toString().substr(4, 6);
      const hasNotification = props.myUsername
        ? !readLastMessage(props.myUsername, chat)
        : false;

      return (
        <ChatCard
          key={`chat_${index}`}
          title={chat.title}
          description={description}
          timeStamp={timeStamp}
          isActive={activeChatKey === chat.id}
          hasNotification={hasNotification}
          onClick={() =>
            props.onChatCardClick && props.onChatCardClick(chat.id)
          }
          renderChatCard={props.renderChatCard}
        />
      );
    });
  };

  if (props.renderChatList) {
    return <>{props.renderChatList(props)}</>;
  }

  return (
    <div
      className="ce-chat-list"
      style={{
        // Default
        ...styles.style,
        // State
        ...(props.isLoading ? { overflowY: 'hidden' } : {}),
        // Props
        ...props.style,
      }}
    >
      <ChatForm
        onFormSubmit={props.onChatFormSubmit}
        renderChatForm={props.renderChatForm}
      />

      {props.isLoading ? renderLoading() : renderChats(props.chats)}

      {props.hasMoreChats && (
        <RenderTrigger
          onShow={props.onChatLoaderVisible}
          style={{
            ...styles.loadingMoreChatsStyle,
            ...props.loadingMoreChatsStyle,
          }}
          children={<Spinner />}
        />
      )}
    </div>
  );
};