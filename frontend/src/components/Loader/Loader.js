import { Circles } from "react-loader-spinner";
import "./Loader.css";
export default function Loader() {
  return (
    <div className="loading">
      <div>
        <Circles
          className="loading"
          height="80"
          width="80"
          color="rgba(212, 95, 0, 0.979)"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}
