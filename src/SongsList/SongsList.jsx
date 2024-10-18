import './SongsList.css'; 

export default function Songslist({songs}){
    return (
        <div className="songlist-container">
            <h2 className="album-title">Album Songs</h2>
            <table className="songlist">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Artist(s)</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index)=>(
                        <tr key={song.id}>
                            <td>{index + 1}</td>
                            <td>{song.name}</td>
                            <td>{song.artists.map(artist => artist.name).join(', ')}</td>
                            <td>{song.duration_ms}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


