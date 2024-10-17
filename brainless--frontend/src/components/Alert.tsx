type Props = {
  message: string;
  type: string;
};

const Alert = (props: Props) => {
  let alertStyle = "";
  let alertIcon = "";
  let alertTitle = "";

  switch (props.type) {
    case "info":
      alertStyle = "text-blue-800 border-blue-300 bg-blue-50";
      alertIcon =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"; // Adicione o caminho do SVG correto
      alertTitle = "Info alert!";
      break;
    case "danger":
      alertStyle = "text-red-800 border-red-300 bg-red-50";
      alertIcon =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z";
      alertTitle = "Danger alert!";
      break;
    case "success":
      alertStyle = "text-green-800 border-green-300 bg-green-50";
      alertIcon =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z";
      alertTitle = "Success alert!";
      break;
    case "warning":
      alertStyle = "text-yellow-800 border-yellow-300 bg-yellow-50";
      alertIcon =
        "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z";
      alertTitle = "Warning alert!";
      break;
    case "dark":
      alertStyle = "text-gray-800 border-gray-300 bg-gray-50";
      alertIcon = "Dark Icon SVG Path here";
      alertTitle = "Dark alert!";
      break;
    default:
      alertStyle = "text-gray-800 border-gray-300 bg-gray-50";
      alertIcon = "Default Icon SVG Path here";
      alertTitle = "Default alert!";
  }

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm ${alertStyle} rounded-lg`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={alertIcon} />
      </svg>
      <span className="sr-only">{alertTitle}</span>
      <div>
        <span className="font-medium">{alertTitle}</span> {props.message}
      </div>
    </div>
  );
};

export default Alert;
