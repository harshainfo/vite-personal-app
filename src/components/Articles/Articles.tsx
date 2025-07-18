export default function Articles() {
    return (
        <div>
        <h2>Articles</h2>
        <p>
            This page is under construction.
        </p>
        <p>
            Please visit <a href={import.meta.env.VITE_MEDIUM_URL} target="_blank" rel="noopener noreferrer">{import.meta.env.VITE_MEDIUM_URL}</a> for my articles.
        </p>
        </div>
    );
    }
    