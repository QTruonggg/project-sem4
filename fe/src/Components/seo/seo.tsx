import { data } from 'autoprefixer';
import Head from 'next/head';
import * as React from 'react';

export interface SeoData {
    title: string;
    description: string;
    url: string;
    thumbnail: string;
}
export interface ISeoProps {
    data: SeoData;
}

export default function Seo({ data }: ISeoProps) {
    const { title, description, url, thumbnail } = data;

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={thumbnail} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={thumbnail} />
        </Head>
    );
}

