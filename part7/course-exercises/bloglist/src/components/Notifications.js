import { useSelector } from "react-redux";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return notifications.message ? <div>{notifications.message}</div> : null;
};

export default Notifications;
