import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import RightSideContent from '../RightSideContent/RightSideContent'

export default function MainContainer() {
  return (
    <div className='main-Container'>
        <Sidebar/>
        <RightSideContent/>
    </div>
  )
}