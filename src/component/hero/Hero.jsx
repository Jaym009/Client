import React from 'react'
import classes from './hero.module.css'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const [type, setType] = useState("beach")
  const [continent, setContinent] = useState("0")
  const [priceRange, setpriceRange] = useState("0")
  const navigate = useNavigate()


  const handleSearch = () => {
    // navigate to properties 
    navigate(`/properties?type=${type}&continent=${continent}&priceRange=${priceRange}`)
  }



  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best selection of luxury real estate</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option disabled>Select Type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0 - 1,00,000</option>
            <option value="1">1,00,000 - 2,00,000</option>
            <option value="2">2,00,000 - 3,00,000</option>
            <option value="3">3,00,000 - 4,00,000</option>
            <option value="4">More than 5,00,000</option>
          </select>
          <select onChange={(e) => setpriceRange(e.target.value)}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">North America</option>
            <option value="4">South America</option>
            <option value="5">Oceania</option>
          </select>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/>
        </div>
      </div>
    </div>
  )
}

export default Hero