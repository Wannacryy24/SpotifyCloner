import React from 'react'
import { useParams } from 'react-router-dom';

export default function Player() {
    const {id, trackId} = useParams();
  return (
    <div className='content'>
        <iframe
            title="Spotify Embed: Specific Song"
            src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`} // Get track ID
            width="100%"
            height="100%"
            style={{ minHeight: '360px' }}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    </div>
    )
}

//0YUrjFy4qFKOO5NhM9tYdV