


export default function VideoRender({ vidStr }: { vidStr: string }) {
    console.log(vidStr);
    const buf = Buffer.from(vidStr, 'base64');
    const blob = new Blob([buf], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-3">Video Render</h1>
            <p className="text-gray-600 mb-6">This component is for rendering video content.</p>
            <video
                controls
                width="100%"
                className="rounded-md border border-gray-300 shadow-sm"
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

    );
}