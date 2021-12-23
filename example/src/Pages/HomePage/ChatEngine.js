import React from 'react';
import { connect } from 'react-redux';

import {
  ChatEngineWindow,
  UserSocket,
  useChatEngineUserHooks,
} from 'react-chat-engine';

const ChatEngineApp = (props) => {
  const state = useChatEngineUserHooks(
    props.projectID,
    props.accounts.userName,
    props.accounts.userSecret,
    props.development
  );

  return (
    <div>
      <UserSocket
        projectId={props.projectID}
        myUsername={props.accounts.userName}
        mySecret={props.accounts.userSecret}
        isDevelopment={props.development}
        // Socket Hooks
        onConnect={state.onConnect}
        onAuthFail={state.onAuthFail}
        onNewChat={state.onNewChat}
        onEditChat={state.onEditChat}
        onDeleteChat={state.onDeleteChat}
        onNewMessage={state.onNewMessage}
        onEditMessage={state.onEditMessage}
        onDeleteMessage={state.onDeleteMessage}
        onIsTyping={state.onIsTyping}
      />

      <ChatEngineWindow
        timezoneOffset={-7}
        myUsername={state.myUsername}
        chats={state.chats}
        activeChatId={state.activeChatId}
        messages={state.messages}
        // State
        hasMoreChats={state.hasMoreChats}
        hasMoreMessages={state.hasMoreMessages}
        // Component Hooks
        onChatFormSubmit={state.onChatFormSubmit}
        onChatCardClick={state.onChatCardClick}
        onChatLoaderShow={state.onChatLoaderShow}
        onMessageLoaderShow={state.onMessageLoaderShow}
        onMessageLoaderHide={state.onMessageLoaderHide}
        onBottomMessageShow={state.onBottomMessageShow}
        onBottomMessageHide={state.onBottomMessageHide}
        onMessageFormSubmit={state.onMessageFormSubmit}
        onInvitePersonClick={state.onInvitePersonClick}
        onRemovePersonClick={state.onRemovePersonClick}
        onDeleteChatClick={state.onDeleteChatClick}
        style={{ height: props.height }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return { accounts: state.accounts };
}

export default connect(mapStateToProps, {})(ChatEngineApp);