import classes from "./Notification.module.css";

export type NotificationProps = {
  title: string;
  message: string;
  status: string;
} | null;

const Notification = (props: NotificationProps) => {
  if (!props) {
    return null;
  }

  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
