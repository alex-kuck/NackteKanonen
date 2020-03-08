import React from "react";

interface YoutubeVideoProps {
    title: string,
    url: string
}

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ title, url }) => {
    return <iframe title={ title }
                   width="80%" height="315"
                   src={ url } frameBorder="0"
                   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen></iframe>;
};