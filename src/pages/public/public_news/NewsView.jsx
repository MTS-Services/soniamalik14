import React, { useEffect, useState } from 'react';
import Title from '../../../components/ui/Title';
import NewsList from './components/NewsList';
import Container from '../../../components/layout/Container';
import { GET } from '../../../services/httpMethods';
import { ENDPOINT } from '../../../services/httpEndpoint';

const NewsView = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await GET(ENDPOINT.NEWS.LIST);
                // Debug: log raw response and payload to help diagnose API issues
                // eslint-disable-next-line no-console
                console.log('[NewsView] GET', ENDPOINT.NEWS.LIST, response);
                // eslint-disable-next-line no-console
                console.log('[NewsView] payload', JSON.stringify(response?.data ?? response, null, 2));

                // Normalize different backend shapes (be permissive)
                let articles = [];
                const payload = response?.data ?? response;

                if (Array.isArray(payload)) {
                    articles = payload;
                } else if (Array.isArray(payload.data)) {
                    articles = payload.data;
                } else if (Array.isArray(payload.data?.data)) {
                    articles = payload.data.data;
                } else if (Array.isArray(payload.results)) {
                    articles = payload.results;
                } else if (Array.isArray(payload.pagination?.limit)) {
                    articles = payload.pagination.limit;
                } else if (Array.isArray(payload.items)) {
                    articles = payload.items;
                }

                // Normalize each article to fields expected by the components
                const normalize = (a) => {
                    const getContentString = (val) => {
                        if (!val && val !== 0) return '';
                        if (typeof val === 'string') return val;
                        if (val?.rendered && typeof val.rendered === 'string') return val.rendered;
                        if (val?.html && typeof val.html === 'string') return val.html;
                        try { return JSON.stringify(val); } catch (e) { return ''; }
                    };

                    let contentHtml = getContentString(a.content) || getContentString(a.body) || getContentString(a.description) || getContentString(a.excerpt) || '';
                    const lower = contentHtml.toLowerCase();
                    if (lower.includes('constructvisualizerpayload') || lower.startsWith('function ')) {
                        contentHtml = getContentString(a.excerpt) || getContentString(a.description) || '';
                    }

                    return {
                        id: a.id,
                        title: a.title || a.name || '',
                        excerpt: a.excerpt ?? a.desc ?? a.summary ?? '',
                        image: a.image ?? a.img ?? '',
                        // prefer publishedAt, fallback to createdAt or date
                        date: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : a.createdAt ? new Date(a.createdAt).toLocaleDateString() : a.date ?? '',
                        content: contentHtml,
                        raw: a,
                    };
                };

                const normalized = articles.map(normalize);
                setNewsList(normalized);
            } catch (err) {
                const message = err?.response?.data?.message || err?.message || 'Failed to fetch news';
                // eslint-disable-next-line no-console
                console.error('[NewsView] GET error', err);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    if (loading) {
        return (
            <Container className="py-6 lg:py-8">
                <div className="text-center py-20 text-gray-600">Loading news...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-6 lg:py-8">
                <div className="text-center py-20 text-red-600">{error}</div>
            </Container>
        );
    }

    const featured = newsList.length > 0 ? newsList[0] : null;
    const items = newsList.length > 1 ? newsList.slice(1) : [];

    if (!featured) {
        return (
            <Container className="py-6 lg:py-8">
                <div className="text-center py-20 text-gray-600">No news available</div>
            </Container>
        );
    }

    return (
        <Container className="py-6 lg:py-8">
            <div className="">
                <Title>Latest News</Title>
                <div className="mt-4 lg:mt-6">
                    <NewsList featured={featured} items={items} />
                </div>
            </div>
        </Container>
    );
};

export default NewsView;