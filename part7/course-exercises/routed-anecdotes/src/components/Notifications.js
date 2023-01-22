import { useSelector } from "react-redux";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return notifications.message === "" ? null : (
    <div>{notifications.message}</div>
  );
};

export default Notifications;
