import React from 'react'
import classes from './footer.module.css'
const Footer = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.col}>
        <h2>About the app</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque magni libero, assumenda deleniti repellat labore alias iusto! Soluta eius ut blanditiis placeat ab esse natus optio. Nobis molestiae eligendi enim atque odio.</p>
      </div>
      <div className={classes.col}>
        <h2>Contacts</h2>
        <span>Phone: +123 456 789</span>
        <span>Mail: abc@gmail.com</span>
      </div>
      <div className={classes.col}>
        <h2>Location</h2>
        <span>Continent: Europe</span>
        <span>Country: Bulgaria</span>
      </div>
    </div>
  )
}

export default Footer