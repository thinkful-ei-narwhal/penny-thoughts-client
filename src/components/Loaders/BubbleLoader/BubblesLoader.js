import React from 'react'
import './BubblesLoader.css'

export default function BubblesLoader() {
  return (
    <div className="spinner" aria-busy="true">
      <span className="bubble1"></span>
      <span className="bubble2"></span>
      <span className="bubble3"></span>
    </div>
  )
}