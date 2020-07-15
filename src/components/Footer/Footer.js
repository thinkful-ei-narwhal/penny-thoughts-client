import React, { Component } from 'react'
import './Footer.css'

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span>Penny Thoughts by Team.prototype.  Copyright 2020. </span> <span> || </span><a href="https://github.com/thinkful-ei-narwhal/penny-thoughts-client" target="_blank" rel="noopener noreferrer">Client</a><span> || </span><a href="https://github.com/thinkful-ei-narwhal/penny-thoughts-server" target="_blank" rel="noopener noreferrer">Server</a><span> Various artwork created by </span><a href="https://twitter.com/danmartins_art" target="_blank" rel="noopener noreferrer">@danmartins_art</a>
      </footer>
    )
  }
}

export default Footer
