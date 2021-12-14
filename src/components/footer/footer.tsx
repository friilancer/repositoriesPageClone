import { useState } from 'react';
import './footer.css';

const Footer = () => {
    const [year] = useState(new Date().getFullYear())
    return(
        <footer>
            <div>
                <div id="copyRight">&copy; {`${year} Github, Inc`}</div>
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Security</a>
                <a href="#">Status</a>
                <a href="#">Docs</a>
            </div>
            <i id="footerIcon" className="fab fa-github"></i>
            <div>
                <a href="#">Contact Github</a>
                <a href="#">Pricing</a>
                <a href="#">API</a>
                <a href="#">Training</a>
                <a href="#">Blog</a>
                <a href="#">About</a>
            </div>
        </footer>
    );
}

export default Footer;