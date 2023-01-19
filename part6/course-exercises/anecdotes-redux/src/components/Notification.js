import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  const style = {
    border: "1px solid",
    padding: "10px",
  };

  return notification.message ? (
    <div style={style}>{notification.message}</div>
  ) : null;
};

export default Notification;
