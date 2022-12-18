import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Filter from "../Filter/Filter";
import Table from "../Table/Table";
import "./Home.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [startDate, setstartDate] = useState(searchParams.get("startDate") || '');
  const [endDate, setendDate] = useState(searchParams.get("endDate") || '');
  const [data, setdata] = useState([]);
  const [req, setreq] = useState(searchParams.get("req") || false);
  const [res, setres] = useState(searchParams.get("res") || false);
  const [impress, setimpress] = useState(searchParams.get("impress") || false);
  const [click, setclick] = useState(searchParams.get("click") || false);
  const [revenue, setrevenue] = useState(searchParams.get("revenue") || false);
  const [fr, setfr] = useState(searchParams.get("fr") || false);
  const [ctr, setctr] = useState(searchParams.get("ctr") || false);
  const [showFilters, setshowFilters] = useState(true);

  const toggleReq = () => {
    const params = getQueryParams();
    params['req'] = !req;
    setSearchParams(params);
    setreq(!req);
  }
  const toggleRes = () => {
    const params = getQueryParams();
    params['res'] = !res;
    setSearchParams(params);
    setres(!res);
  }
  const toggleImpress = () => {
    const params = getQueryParams();
    params['impress'] = !impress;
    setSearchParams(params);
    setimpress(!impress);
  }
  const toggleClick = () => {
    const params = getQueryParams();
    params['click'] = !click;
    setSearchParams(params);
    setclick(!click);
  }
  const toggleRevenue = () => {
    const params = getQueryParams();
    params['revenue'] = !revenue;
    setSearchParams(params);
    setrevenue(!revenue);
  }
  const toggleFR = () => {
    const params = getQueryParams();
    params['fr'] = !fr;
    setSearchParams(params);
    setfr(!fr);
  }
  const toggleCTR = () => {
    const params = getQueryParams();
    params['ctr'] = !ctr;
    setSearchParams(params);
    setctr(!ctr);
  }

  const fetchData = useCallback((sDate,eDate) => {
      fetch(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${sDate}&endDate=${eDate}`
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json && json.data) {
            setdata(json.data);
          } else {
            setdata([]);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getQueryParams = () => {
    const params = {};
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      params[param] = value;
    }
    return params;
  }

  const changeStartDate = (d) => {
    setstartDate(d);
    const params = getQueryParams();
    params["startDate"] = d;
    setSearchParams(params);
  };
  const changeEndDate = (d) => {
    setendDate(d);
    const params = getQueryParams()
    params["endDate"] = d;
    setSearchParams(params);
  };

  const applyChange = () => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
    }
  }

  return (
    <div className="Home-wrapper">
      <div className="header">
        <h2 style={{ margin: 0 }}>Analytics</h2>
      </div>
      <div className="setting-wrapper">
        <div className="date-wrapper">
          <div className="d1">
            <span style={{ marginBottom: "3px" }}>Start Date</span>
            <input
              className="date"
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => {
                changeStartDate(e.target.value);
              }}
            ></input>
          </div>
          <div className="d1">
            <span style={{ marginBottom: "3px" }}>End Date</span>
            <input
              className="date"
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => {
                changeEndDate(e.target.value);
              }}
            ></input>
          </div>
          <div className="d1">
          <button onClick={applyChange} className="submit">
          <span>Submit</span>
        </button>
          </div>
        </div>

        <button onClick={() => setshowFilters(!showFilters)} className="setting">
          <span className="material-symbols-outlined">tune</span>
          <span>Settings</span>
        </button>
      </div>
      {showFilters && <Filter toggleCTR={toggleCTR} toggleClick={toggleClick} toggleFR={toggleFR} toggleImpress={toggleImpress} toggleReq={toggleReq} toggleRes={toggleRes} toggleRevenue={toggleRevenue} handleClose={() => setshowFilters(false)} />}
      <Table data={data} req={req} res={res} click={click} revenue={revenue} impress={impress} fr={fr} ctr={ctr} />
    </div>
  );
}

export default Home;