import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  const style = {
    padding: "10px",
    border: "1px solid",
  };

  return notification !== "" ? <div style={style}>{notification}</div> : null;
};

export default Notification;
