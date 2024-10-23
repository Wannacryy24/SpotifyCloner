import React from 'react'

export default function Player({id}) {
    console.log('inPlayer');
    console.log(id);
  return (
    <>
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
    </>
    )
}
