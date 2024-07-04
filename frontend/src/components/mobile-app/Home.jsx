import React from 'react';

function Home() {
    const albums = [
        { id: 1, title: 'My Favorites', photoCount: 108, image: 'path/to/image1.jpg', category: 'Recently' },
        { id: 2, title: 'People & Places', photoCount: 232, image: 'path/to/image2.jpg', category: 'Recently' },
        { id: 3, title: 'Happy New Year', photoCount: 87, image: 'path/to/image3.jpg', category: 'Other Albums' },
        { id: 4, title: 'Anguilla', photoCount: 76, image: 'path/to/image4.jpg', category: 'Other Albums' },
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
            <div>
                {['Recently', 'Other Albums'].map((category) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">{category}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {albums
                                .filter((album) => album.category === category)
                                .map((album) => (
                                    <div
                                        key={album.id}
                                        className="relative rounded-lg overflow-hidden shadow-lg"
                                        style={{ height: '200px', backgroundImage: `url(${album.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    >
                                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center text-white">
                                            <div className="text-center">
                                                <h3 className="text-lg font-bold">{album.title}</h3>
                                                <p>{album.photoCount} Photos</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
