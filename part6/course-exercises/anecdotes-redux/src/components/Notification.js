//import { useSelector } from "react-redux";
import { connect } from "react-redux";

const Notification = (props) => {
  //const notification = useSelector((state) => state.notifications);
  const notification = props.notification;

  const style = {
    border: "1px solid",
    padding: "10px",
    margin: "10px 0",
  };

  return notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  };
};

const ConnectedNotifications = connect(mapStateToProps)(Notification);

export default ConnectedNotifications;
