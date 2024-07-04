import React, { useState } from 'react'
import classes from './navbar.module.css'
import {Link, useNavigate} from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineFileImage, AiOutlineClose} from 'react-icons/ai'
import {logout} from '../../redux/authSlice'
import {request} from '../../util/fetchApi'



const Navbar = () => {

  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  const [showForm, setShowForm] = useState(false) 
  const {user, token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
  }

  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setPhoto(null)
    setState({})
    console.log('Close button clicked');
  }

  const handleListProperty = async(e) => {
    e.preventDefault()

    let filename = null
    if(photo){
      const formData = new FormData()
      filename = crypto.randomUUID() + photo.name
      formData.append("filename", filename)
      formData.append("image", photo)

      await request('/upload/image', "POST", {}, formData, true)
    } else {
      return
    }

    try {
      const options = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      console.log(token)
      const data = await request('/property', 'POST', options, {...state, img: filename})
      console.log(data)
      handleCloseForm()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to='/' className={classes.left}>
          Real Estate <BsHouseDoor />
        </Link>  
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>  
          <li className={classes.listItem}>About</li>  
          <li className={classes.listItem}>Featured</li>  
          <li className={classes.listItem}>Contacts</li>  
        </ul>  
        <div className={classes.right}>
          {
          !user ?
          <>
            <Link to='/signup'>Sign Up</Link>
            <Link to='/signin'>Sign In</Link>
          </>  
          :
          <>
            <span>Hello {user.username}</span>
            <span onClick={handleLogout} className={classes.logoutBtn} style={{cursor: 'pointer'}}>Logout</span>
            <Link onClick={() => setShowForm(true)} className={classes.list}>List your property</Link>
          </>
          }
        </div>  
      </div>
      {
        showForm && (
          <div onClick={handleCloseForm} className={classes.listPropertyForm}>
            <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
              <h2>List Property</h2>
              <form onSubmit={handleListProperty} style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                <input type="text" name="title"  placeholder='Title...' onChange={handleState}/>
                <input type="text" name="type"  placeholder='Type...' onChange={handleState}/>
                <input type="text" name="desc"  placeholder='Desc...' onChange={handleState}/>
                <input type="text" name="continent"  placeholder='Continent...' onChange={handleState}/>
                <input type="number" name="price"  placeholder='Price...' onChange={handleState}/>
                <input type="number" name="sqmeters"  placeholder='Sq. Meters...' onChange={handleState}/>
                <input type="number" name="beds"  placeholder='Beds...' step={1} min={2} onChange={handleState}/>

                <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '50%'}}>
                  <label htmlFor="photo">Property Picture <AiOutlineFileImage /></label>
                  <input type="file"  id="photo" style={{display: 'none'}} onChange={(e) => setPhoto(e.target.files[0])} />
                  {photo && <p>{photo.name}</p>}

                </div>
                <button style={{marginTop: '-15px'}}>List Property</button>

              </form>
              <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon}/> 
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Navbar