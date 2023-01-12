import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.message;
  let style = {
    padding: "10px",
    margin: "10px",
    border: "1px solid",
  };

  return notification !== "" ? <div style={style}>{notification}</div> : null;
};

const mapStateToProps = (state) => {
  return {
    message: state.notifications.message,
  };
};

export default connect(mapStateToProps)(Notification);
