import React from 'react';
import { getUserStatus } from '/imports/api/collections/users';

import '/imports/ui/styles/parts/video/MyVideoComponentStyle.less';

export const MyVideoComponent = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
    stream: React.PropTypes.object.isRequired,
  },
  shouldComponentUpdate: function (nextProps) {
    return this.props.stream.id !== nextProps.stream.id;
  },
  render: function () {
    return (
      <div className="chat-sidebar-avatar bottom" key={this.props.stream.id}>
        <video
          className={"my-video avatar-image " + getUserStatus(this.props.user.status)}
          src={URL.createObjectURL(this.props.stream)}
          muted
          autoPlay
        />
      </div>
    );
  }
});
