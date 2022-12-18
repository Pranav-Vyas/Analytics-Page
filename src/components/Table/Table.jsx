import React from "react";
import './Table.css'

function Table({ 
   data = [],
   req = false,
   res = false,
   impress = false,
   revenue = false,
   click = false,
   fr = false,
   ctr = false 
  }) {

    const appName = {
        "123456" : "Panda Draw",
        "789652" : "Number Ninja",
        "741553" : "Word Crush",
        "986321" : "Brain Quiz",
        "320248" : "Age Calculator"
    }

    const getDate = (date) => {
        const temp = new Date(date);
        const day = temp.getDate();
        const month = temp.getMonth() + 1;
        const year = temp.getFullYear();
        return [day,month,year].join('-');

    }

    const fillRate = (req,res) => {
        return ((req/res)*100).toFixed(2)
    }

    const ctrCalc = (clicks, impressions) => {
        return ((clicks/impressions)*100).toFixed(2)
    }

  return data.length !== 0 ? (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th className="column">Date</th>
            <th className="column">App Name</th>
            {req && <th className="column">Ad Request</th>}
            {res && <th className="column">Ad Response</th>}
            {impress && <th className="column">Impressions</th>}
            {click && <th className="column">Clicks</th>}
            {revenue && <th className="column">Revenue</th>}
            {fr && <th className="column">Fill Rate</th>}
            {ctr && <th className="column">CTR</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item,key) => (
            <tr key={key}>
              <td>{getDate(item.date)}</td>
              <td>{appName[item.app_id]}</td>
              {req && <td>{item.requests}</td>}
              {res && <td>{item.responses}</td>}
              {impress && <td>{item.impressions}</td>}
              {click && <td>{item.clicks}</td>}
              {revenue && <td>{item.revenue ? item.revenue.toFixed(2) : ''}</td>}
              {fr && <td>{fillRate(item.requests, item.responses)}</td>}
              {ctr && <td>{ctrCalc(item.clicks, item.impressions)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null
}

export default Table;
