


export default function VideoRender({ vidStr }: { vidStr: string }) {
    console.log(vidStr);
    const buf = Buffer.from(vidStr, 'base64');
    const blob = new Blob([buf], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(blob);
    return (
        <div>
            <h1>Video Render</h1>
            <p>This component is for rendering video content.</p>
            <video controls width="600">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}