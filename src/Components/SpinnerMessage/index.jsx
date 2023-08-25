import { ImSpinner9 } from 'react-icons/im';
import './SpinnerMessage.css';

const SpinnerMessage = ({ loading, message }) => {
  return (
    <div className="SpinnerMessage">
      <p role="status">
        {loading ? <ImSpinner9 className="spinner-icon" /> : null}
        {loading ? (
          <span className="spinner-text">sentiment analysis...</span>
        ) : null}
        {!loading && message && <span>{message}</span>}
      </p>
    </div>
  );
};

export default SpinnerMessage;
