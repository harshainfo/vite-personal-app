export default function Videos() {
    return (
        <div>
        <h2>Videos</h2>
        <p>
            This page is under construction.
        </p>
        <p>
            <a
                href={import.meta.env.VITE_YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                {import.meta.env.VITE_YOUTUBE_CHANNEL_NAME}
            </a> for my videos.
        </p>
        </div>
    );
    }
