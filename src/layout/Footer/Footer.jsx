import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        Powered by -{`  `}
        <a
          href="http://base5builder.com/?click_source=quillpro_footer_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          DevJuction
        </a>
      </footer>
    );
  }
}

export default Footer;
