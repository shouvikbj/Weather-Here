import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Navbar from './Navbar'

const Home = () => {
  const [lat, setLat] = useState(22.5726)
  const [lng, setLng] = useState(88.3639)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      });
    }
    fetch(`https://api.weatherapi.com/v1/current.json?key=db9db260ed7f4d05a00123335230302&q=${lat},${lng}`,{
      method: "GET",
      mode: "cors"
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data)
      console.log(data)
      setLoading(false)
    })
  }, [lat, lng])

  return (
    <div>
      <Navbar/>
      <div className='container'>
        <div className='row'>
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <div>
              <br/>
              <Link to="/search" className='btn btn-outline-primary' style={{float: "right", borderRadius: "50px"}}>search</Link>
            </div>
            {loading? (
              <div className="spinner-border text-primary" role="status" style={{alignSelf: "center"}}>
                <span className="visually-hidden text-center">Loading...</span>
              </div>
            ) : (
              <div>
                <br/><br/>
                <div className="card" style={{width: "100%", borderRadius: "30px"}}>
                  <img style={{width: "30%", alignSelf: "center"}} src={`https:${data.current.condition.icon}`} className="card-img-top" alt="..." />
                  <p className="card-text text-center text-primary">{data.current.condition.text}</p>
                  <div className="card-body">
                    <h5 className="card-title">{data.location.name}</h5>
                    <p className='card-title' style={{fontWeight: "bolder"}}>{data.location.region}, {data.location.country}</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Temperature</span> : {data.current.temp_c}°C / {data.current.temp_f}°F</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Feels Like</span> : {data.current.feelslike_c}°C / {data.current.feelslike_f}°F</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Humidity</span> : {data.current.humidity}%</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Wind Speed</span> : {data.current.wind_kph} kph / {data.current.wind_mph} mph</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Wind Direction</span> : {data.current.wind_dir}</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Visibility</span> : {data.current.vis_km} km / {data.current.vis_miles} miles</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>Wind Gust</span> : {data.current.gust_kph} kph / {data.current.gust_mph} mph</p>
                    <p className="card-text"><span className="text-primary" style={{fontWeight: "bolder",}}>UV</span> : {data.current.uv} mW/m2</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
      <br/><br/><br/>
    </div>
  )
}

export default Home