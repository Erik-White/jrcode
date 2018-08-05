import React from 'react'
import Link from 'gatsby-link'
import Icon from './Icon'
import github from '../img/github-icon.svg'
import twitter from '../img/twitter-icon.svg'

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
      </div>
      <div className="navbar-start">
        <Link className="navbar-item" to="/about">
          About
        </Link>
      </div>
      <div className="navbar-end">
        <Icon 
            link="https://twitter.com/Butter_Bridge"
            src={twitter}
            alt="Twitter"
        />
        <Icon 
            link="https://github.com/ButterBridge"
            src={github}
            alt="Github"
        />
      </div>
    </div>
  </nav>
)

export default Navbar
