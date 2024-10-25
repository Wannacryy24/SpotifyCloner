import React from 'react'
import AlbumData from '../MainViewContainer/AlbumData'
import NewReleases from '../MainViewContainer/NewReleases/NewReleases'
import './RightSideContent.css'
import Artists from '../MainViewContainer/Artists/Artists'
export default function RightSideContent() {
  return (
    <div className="content overflow-hidden">
        <Artists/>
        <AlbumData/>
        <NewReleases/>
    </div>
  )
}