import './Footer.css'

function Footer() {
    return (
        <div className='footer-cont'>
            <div className='footer'>
                <div className='ls-footer'>
                    <div>© 2023 TheBnb, Inc</div>
                    <a href='https://www.linkedin.com/in/brandonshin79/' target='_blank' className='about-link'>LinkedIn</a>
                    <a href='https://www.linkedin.com/in/brandonshin79/' target='_blank' className='about-link'>GitHub</a>
                    <a href='https://www.linkedin.com/in/brandonshin79/' target='_blank' className='about-link'>AngelList</a>
                </div>
                <div className='rs-footer'>
                    <div><i className="fa-solid fa-globe"></i> English (US)</div>
                    <div>$ USD</div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
