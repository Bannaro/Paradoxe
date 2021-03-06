import React from 'react';

import { ChatContainer } from '/imports/ui/containers/parts/chat/ChatContainer';
import { ChatSidebarContainer } from '/imports/ui/containers/parts/chat/ChatSidebarContainer';
import { NotFoundPageComponent } from '/imports/ui/components/pages/NotFoundPageComponent';
import { SpinnerComponent } from '/imports/ui/components/parts/app/spinner/SpinnerComponent';

export const ChatPageComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    ready: React.PropTypes.bool.isRequired,
    hasContact: React.PropTypes.bool.isRequired,
    contact: React.PropTypes.object,
    loadMessages: React.PropTypes.func.isRequired,
  },
  getInitialState: function () {
    return {
      ready: false,
    };
  },
  componentWillMount: function () {
    this.props.loadMessages();
  },
  componentWillReceiveProps: function (nextProps) {
    if (!this.state.ready && nextProps.ready) {
      this.setState({
        ready: true,
      });
    }

    if (this.props.contact && !nextProps.contact
      || this.props.contact && nextProps.contact && this.props.contact._id !== nextProps.contact._id) {
      this.props.loadMessages(nextProps.params.contactUsername);
      this.setState({
        ready: false,
      });
    }
  },
  render: function () {
    if (!this.state.ready) {
      return (
        <SpinnerComponent />
      );
    }

    return this.props.hasContact
      ? <div>
        <ChatContainer contact={this.props.contact}/>
        <ChatSidebarContainer contact={this.props.contact}/>
      </div>
      : <NotFoundPageComponent />;
  },
});
