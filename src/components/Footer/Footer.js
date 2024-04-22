import { Link } from "react-router-dom";


const Footer = ()=>{
    return(
        <>
           <footer className="site-footer">
                <div className="container">
                    <div className="site-footer-inner" style={{display:"flex" , justifyContent:"center", alignItems: "center", flexDirection:"column"}}>
                        <div>
                            <Link to="#">
                                <img className="header-logo-image" src={process.env.PUBLIC_URL+"dist/images/logo.png"} alt="Logo" width="70x"/>
                            </Link>
                        </div>
                        <div>&copy; All rights reserved.</div>
                    </div>
                </div>
            </footer>  
        </>
    )
}

export default Footer;