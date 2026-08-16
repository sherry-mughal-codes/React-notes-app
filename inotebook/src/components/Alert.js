import { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function Alert() {
  const { alert } = useContext(NoteContext);

  if (!alert) return null;

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "fa-solid fa-circle-check";
      case "danger":
        return "fa-solid fa-triangle-exclamation";
      case "info":
        return "fa-solid fa-circle-info";
      default:
        return "fa-solid fa-bell";
    }
  };

  return (
    <div className="custom-alert-container">
      <div className={`alert alert-${alert.type} shadow-lg d-flex align-items-center mb-0`} role="alert">
        <i className={`${getIcon(alert.type)} me-2 fs-5`}></i>
        <div className="fw-semibold">{alert.msg}</div>
      </div>
    </div>
  );
}

export default Alert;
