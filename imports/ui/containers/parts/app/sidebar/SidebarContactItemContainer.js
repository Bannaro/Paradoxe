import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getUserStatus, userHasBlockedContact } from '/imports/api/collections/users';
import {
  INCOMING_VIDEO_CALL_TAG,
  OUTGOING_VIDEO_CALL_TAG,
  RINGING_STATUS,
  ANSWERED_STATUS
} from '/imports/api/collections/messages';

import { SidebarContactItemComponent } from '/imports/ui/components/parts/app/sidebar/SidebarContactItemComponent';

const mapStateToProps = (state, props) => {
  const messages = state.sidebar.messages.filter(message =>
    message.toUserId.includes(state.user._id) &&
    (message.contactId && message.contactId.includes(props.contact._id) ||
    message.userId && message.userId === props.contact._id)
  );

  const newMessages = location.pathname.replace('/chat/', '') !== props.contact.username
    ? messages.filter(message => !message.read.includes(state.user._id))
    : [];

  const ringingMessages = messages.filter(message => message.status === RINGING_STATUS);

  return {
    user: state.user,
    contactStatus: getUserStatus(props.contact.status),
    userHasBlockedContact: userHasBlockedContact(state.user, props.contact._id),
    newMessages,
    incomingCall: ringingMessages.filter(message => message.tag === INCOMING_VIDEO_CALL_TAG),
    outgoingCall: ringingMessages.filter(message => message.tag === OUTGOING_VIDEO_CALL_TAG),
    videoCall: messages.filter(message =>
      (message.tag === INCOMING_VIDEO_CALL_TAG || message.tag === OUTGOING_VIDEO_CALL_TAG) &&
      message.status === ANSWERED_STATUS &&
      message.ended === false
    ),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    openChat: () => {
      browserHistory.push(`/chat/${props.contact.username}`);
    }
  };
};

export const SidebarContactItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContactItemComponent);
