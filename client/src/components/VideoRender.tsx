


export default function VideoRender({ vidStr }: { vidStr: string }) {

    if(!vidStr){
        return<h1>Error</h1>
    }
    const buf = Buffer.from(vidStr, 'base64');
    const blob = new Blob([buf], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <video
                controls
                width="100%"
                className="rounded-md border border-gray-300 shadow-sm"
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="flex justify-center mt-4">
                <a
                    download
                    href={videoUrl}
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Download
                </a>
            </div>
        </div>

    );
}