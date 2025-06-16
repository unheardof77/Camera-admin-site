


export default function VideoRender({ vidStr }: { vidStr: string }) {
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
        </div>

    );
}