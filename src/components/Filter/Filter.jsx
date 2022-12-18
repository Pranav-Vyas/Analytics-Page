import React from "react";
import "./Filter.css";

function Filter({
    toggleReq = () => null,
    toggleRes = () => null,
    toggleImpress = () => null,
    toggleClick = () => null,
    toggleRevenue = () => null,
    toggleFR = () => null,
    toggleCTR = () => null,
    handleClose = () => null
}) {

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        window.alert('Link Copied')
    }

  return (
    <div className="filter-wrapper">
      <h3>Dimensions and Metrics</h3>
      <div className="filters">
        <div className="col">
            <span>Date</span>
        </div>
        <div className="col">
            <span>App Name</span>
        </div>
        <button onClick={toggleReq} className="col">
            <span>Ad Requests</span>
        </button>
        <button onClick={toggleRes} className="col">
            <span>Ad Response</span>
        </button>
        <button onClick={toggleImpress} className="col">
            <span>Impression</span>
        </button>
        <button onClick={toggleClick} className="col">
            <span>Clicks</span>
        </button>
        <button onClick={toggleRevenue} className="col">
            <span>Revenue</span>
        </button>
        <button onClick={toggleFR} className="col">
            <span>Fill Rate</span>
        </button>
        <button onClick={toggleCTR} className="col">
            <span>CTR</span>
        </button>
      </div>
      <div className="apply">
        <button onClick={handleClose} className="close-btn">
            <span>Close</span>
        </button>
        <button onClick={handleShare} className="close-btn">
            <span>Share Link</span>
        </button>
      </div>
    </div>
  );
}

export default Filter;
