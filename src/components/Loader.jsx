export default function Loader({ message = 'Chargement...' }) {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring spinner-ring--delay"></div>
      </div>
      <p className="loader-text">{message}</p>
    </div>
  );
}
