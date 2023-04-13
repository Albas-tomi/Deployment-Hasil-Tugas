import React, { useState } from 'react'
import SearchHero from '../components/Home/SearchHero'
import ProductCard from '../components/Card/ProductCard'
import ButtonHero from '../components/Button/ButtonHero'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div >
         <Link to={"/"}>
          <ButtonHero>List Product</ButtonHero>
        </Link>
        <SearchHero/>
    </div>
  )
}

export default LandingPage