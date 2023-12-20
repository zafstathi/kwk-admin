import Spinner from "../Spinner";
import './styles.css'
function ShopDetail(props) {
  const shops = props.data;
  console.log("shops", shops);
  const formateTime = (time) => {
    // Check if the input time is not null and has a length of 4 characters
    if (!time || time.length !== 4) {
        console.error("Invalid time format. Please provide a 4-character military time (HHMM).");
        return null;
    }

    // Parse hours and minutes as integers
    const hours = parseInt(time.substring(0, 2));
    const minutes = parseInt(time.substring(2, 4));

    // Check if parsed values are within valid ranges
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        console.error("Invalid time values. Hours should be between 00 and 23, and minutes between 00 and 59.");
        return null;
    }

    // Determine AM/PM and format the time
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const strTime = formattedHours + ":" + formattedMinutes + " " + ampm;

    console.log(strTime);
    return strTime;
};
console.log("shops is",shops);
   return (
    <div>
      {shops &&
        shops.map((data) => (
          <div key={data.id}> {/* Add a unique key for each mapped item */}
            <h2>Shop Details</h2>
            <div className="card mb-5 ">
              <div className="card-body shopCard">
                {data ? (
                  <div className="row">
                    <div className="col-sm-4 col-md-4 col-lg-4">
                      <img src="assets/img/shop.jpg" width="145" alt="Shop" />
                    </div>
                    <div className="col-sm-8 col-md-8 col-lg-8">
                      <div className="row">
                        <div className="col-5">
                          <b>Shop Name: </b>
                        </div>
                        <div className="col-6">
                          <b>{data?.name} </b>
                        </div>
                      </div>
                      {data?.shop?.always_open ? (
                        <div className="row">
                          <div className="col-6">
                            <b>Shop Schedule: </b>
                          </div>
                          <div className="col-6">
                            <b>Always Open </b>
                          </div>
                        </div>
                      ) : (
                        <div className="shops-timings">
                          <div className="row">
                            <div className="col-4">
                              <b>Day </b>
                            </div>
                            <div className="col-4">
                              <b>Open </b>
                            </div>
                            <div className="col-4">
                              <b>Close </b>
                            </div>
                          </div>
                          {data?.shop?.hours.map((timing, index) => (
                            <div className="row" key={index}>
                              <div className="col-4" style={{ fontSize: 10 }}>{timing.day}</div>
                              <div className="col-4" style={{ fontSize: 10 }}>
                                {formateTime(timing.open)}
                              </div>
                              <div className="col-4" style={{ fontSize: 10 }}>
                                {formateTime(timing.close)}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ShopDetail;