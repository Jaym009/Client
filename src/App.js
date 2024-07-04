
import './App.css';
import {Route, Routes} from 'react-router-dom'
import FeaturedProperties from './component/featuredProperties/FeaturedProperties'
import Navbar from './component/navbar/Navbar'
import Signin from './component/signin/Signin'
import Signup from './component/signup/Signup'
import Properties from './component/properties/Properties'
import PropertyDetail from './component/propertyDetail/PropertyDetail'

import Hero from './component/hero/Hero'
import NewsLetter from './component/newsletter/Newsletter'
import Footer from './component/footer/Footer'
import PopularProperties from './component/popularProperties/PopularProperties'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <>
            <Navbar />
            <Hero />
            <PopularProperties />
            <FeaturedProperties />
            <NewsLetter />
            <Footer />  
          </>
        } />
        
        <Route path='/properties' element={
          <>
            <Navbar />
            <Properties />
            <Footer />
          </>
        } />
        <Route path='/propertyDetail/:id' element={
          <>
            <Navbar />
            <PropertyDetail />
            <Footer />
          </>
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
