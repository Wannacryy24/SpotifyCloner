import React from 'react'
import AlbumData from '../MainViewContainer/AlbumData'
import NewReleases from '../MainViewContainer/NewReleases/NewReleases'
import './RightSideContent.css'
export default function RightSideContent() {
  return (
    <div className="content">
        <AlbumData/>
        <NewReleases/>
    </div>
  )
}