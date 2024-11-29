import { WrapperProducts } from "../../pages/HomePage/style";
import CardProductComponent from "../CardProductComponent/CardProductComponent";
import "./style.css";
import { Button, Statistic } from "antd";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const onFinish = () => {
  console.log("finished!");
};

const DealSection = ({ data, onViewMore }) => {
  return (
    <div className="deal-section">
      <div className="deal-header">
        <div className="deal-header-content">
          <img
            src="/dealIcon.png"
            alt="Deal Icon"
            className="deal-header-icon"
          />
          <div className="deal-timer">
            <Countdown title="" value={deadline} onFinish={onFinish} />
          </div>
          <button className="btn" onClick={onViewMore}>
            Xem thêm
          </button>
        </div>
        <img src="/deal.png" alt="Deal Banner" className="deal-banner-image" />
      </div>

      <div className="deal-list">
        <WrapperProducts>
          {data.slice(0, 5).map((product) => (
            <CardProductComponent {...product} />
          ))}
        </WrapperProducts>
      </div>
    </div>
  );
};

export default DealSection;
