import { useSelector } from "react-redux";
import { StyledNotifications } from "./StyledComponents/Notifications/Notifications.styles";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return notifications.message ? <StyledNotifications>{notifications.message}</StyledNotifications> : null;
};

export default Notifications;
