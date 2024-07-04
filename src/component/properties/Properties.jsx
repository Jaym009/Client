import React, { useEffect, useState } from 'react'
import classes from './properties.module.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {request} from '../../util/fetchApi'
import {continentToIdx, idxToContinent} from '../../util/idxToContinent'
import {arrPriceRanges} from '../../util/idxToPriceRange'
import { AiOutlineSearch } from 'react-icons/ai'
import person from '../../assets/person.jpg'

import {FaBed, FaSquareFull} from 'react-icons/fa'



const Properties = () => {

  const [allProperties, setAllProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [state, setState] = useState(null)

  const query = (useLocation().search).slice(1)
  const arrQuery = query.split("&")
  const navigate = useNavigate()


  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }


  //fetch all properties
  useEffect(() => {
    const fetchAllProperties =  async() => {
      const data = await request('/property/getAll', 'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  }, [])
  //parsing query params
  useEffect(() => {
    if(arrQuery && allProperties?.length > 0 && state === null){
      let formattedQuery = {}

      arrQuery.forEach((option, idx)=>{
        console.log(option.split("="))
        const key = option.split("=")[0]
        const value = option.split("=")[1]

        formattedQuery = {...formattedQuery, [key]: value}

        // if we are on the last index assign the formattedquery object to state
        if(idx === arrQuery.length - 1){
          setState(formattedQuery)
          handleSearch(formattedQuery)
        }
      })
    }
  }, [allProperties, arrQuery])

  const handleSearch = (param = state) => {
    let options
    // we either pass the formattedobj or event, that's why we do the if/else
    if(param?.nativeEvent){
      options = state
    }
    else{
      options = param
    }

    console.log(options)

    const filteredProperties = allProperties.filter((property)=>{
      // options.priceRange === 1 arrpriceRanges[1] => second elements => "100000 - 200000"
      
      const priceRange =  arrPriceRanges[options.priceRange] 
      const minPrice = Number(priceRange.split('-')[0])
      const maxPrice = Number(priceRange.split('-')[1])
      const continent = continentToIdx(property.continent)
      console.log(continent, options.continent)
      if(
        property.type === options.type
        && continent === Number(options.continent)
        && property.price >= minPrice && property.price <= maxPrice
      ){
        return property
      }
    })

    const queryStr = `type=${options.type}&continent=${options.continent}&priceRange=${options.priceRange}`

    navigate(`/properties?${queryStr}`, {replace: true})
    setFilteredProperties(filteredProperties)
  }
  


  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      <div className={classes.options}>
          <select value={state?.type} name='type' onChange={handleState}>
            <option disabled>Select Type</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select value={state?.priceRange} name='priceRange' onChange={handleState}>
            <option disabled>Select Price Range</option>
            <option value="0">0 - 1,00,000</option>
            <option value="1">1,00,000 - 2,00,000</option>
            <option value="2">2,00,000 - 3,00,000</option>
            <option value="3">3,00,000 - 4,00,000</option>
            <option value="4">More than 5,00,000</option>
          </select>
          <select value={state?.continent} name='continent' onChange={handleState}>
            <option disabled>Select Continent</option>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">North America</option>
            <option value="4">South America</option>
            <option value="5">Oceania</option>
          </select>
          <button className={classes.searchBtn}>
          <AiOutlineSearch onClick={handleSearch} className={classes.searchIcon}/>
          </button>
        </div>
        {filteredProperties?.length > 0? (
          <>
          <div className={classes.titles}>
            <h5>Selected Properties</h5>
            <h2>Property you may like</h2>
          </div>
          <div className={classes.properties}>
            {filteredProperties.map((property) => (
              <div key={property._id} className={classes.property}>
                <Link className={classes.imgContainer} to={`/propertyDetail/${property._id}`}>
                  <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                </Link>
                <div className={classes.details}>
                  <div className={classes.priceAndOwner}>
                    <span className={classes.price}>${property.price}</span>
                    <img src={person} alt="" className={classes.owner} />
                  </div>
                  <div className={classes.moreDetails}>
                    <span>{property.beds} <FaBed className={classes.icon}/></span>
                    <span>{property.sqmeters} Sq. Meters <FaSquareFull className={classes.icon}/></span>
                  </div>
                  <div className={classes.desc}>
                    {property.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
        ) : <h2 className={classes.noProperty}>We have no properties for the specified options</h2>}
      </div>
    </div>
  )
}

export default Properties