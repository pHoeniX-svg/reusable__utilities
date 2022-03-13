// handle alert
 const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 7000);
  };

  // alert
  const [alert, setAlert] = useState({ show: false });

 {alert.show && <Alert type={alert.type} text={alert.text} />}



const Alert = ({ type, text }) => {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export { Alert };
