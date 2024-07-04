import React, { useEffect, useState } from 'react'
import classes from './popularproperties.module.css'
import {Link} from 'react-router-dom'
import img1 from '../../assets/realestatebeach.jpg'
import img2 from '../../assets/realestatemountain.jpg'
import img3 from '../../assets/realestatecountryside.jpg'
import { request } from '../../util/fetchApi'

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({})

  useEffect(() => {
    const fetchnumberProperties = async() => {
      try {
        const data = await request('/property/find/types', "GET")
        setNumProperties(data)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchnumberProperties()
  }, [])




  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best types of properties for you</h2>
        </div>
        <div className={classes.properties}>
          <Link className={classes.property} to={`/properties?type=beach&continent=1&priceRange=2`}>
            <img src={img1} />
            <div className={classes.quantity}>{numProperties?.beach} Properties</div>
            <h5>Beach Properties</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=mountain&continent=1&priceRange=2`}>
            <img src={img2} />
            <div className={classes.quantity}>{numProperties?.mountain} Properties</div>
            <h5>Mountain Properties</h5>
          </Link>
          <Link className={classes.property} to={`/properties?type=village&continent=1&priceRange=2`}>
            <img src={img3} />
            <div className={classes.quantity}>{numProperties?.village} Properties</div>
            <h5>Village Properties</h5>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularProperties