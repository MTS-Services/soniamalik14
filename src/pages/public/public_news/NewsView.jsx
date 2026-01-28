import React from 'react';
import Title from '../../../components/ui/Title';
import NewsList from './components/NewsList';
import Container from '../../../components/layout/Container';

const NewsView = () => {
    const featured = {
        date: 'Dec 1, 2025',
        title: "Women's Football League Season 2025 Kicks Off",
        excerpt:
            "The new season of the Women's Football League has officially begun, bringing together top clubs and emerging talents from across the country.",
        image: '/images/login/image_3.jpg',
        url: '#',
    };

    const items = [
        {
            date: 'Dec 2, 2025',
            title: 'Rising Stars: Young Women Footballers to Watch This Year',
            excerpt:
                'Meet the young players who are making headlines with their skills, dedication, and outstanding performances on the field.',
            url: '#',
        },
        {
            date: 'Dec 3, 2025',
            title: 'Community Training Camp Empowers Local Women Players',
            excerpt:
                'A special training camp was organized to support grassroots women footballers with professional coaching and fitness sessions.',
            url: '#',
        },
        {
            date: 'Dec 4, 2025',
            title: 'Women Referees Take the Lead in Local Football Matches',
            excerpt:
                'More women referees are stepping onto the field, creating new opportunities and promoting equality in football.',
            url: '#',
        },
        {
            date: 'Dec 5, 2025',
            title: 'Football Clubs Open Trials Exclusively for Women Players',
            excerpt: 'Several clubs have announced open trials for women footballers, offering a chance to join competitive teams.',
            url: '#',
        },
    ];

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