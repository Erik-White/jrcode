import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import '../style/grid.sass';
import Brand from '../components/Brand';

const TemplateWrapper = ({ children, data }) => {
    const siteName = 'jrcode';
    return <div>
        <Helmet title={siteName} />
        <Brand siteName={siteName} />
        <div className="grid-main">
            <Navbar />
            <div className="grid-main-content">
                {children()}
            </div>
        </div>
    </div>
}

TemplateWrapper.propTypes = {
    children: PropTypes.func,
}

export default TemplateWrapper;