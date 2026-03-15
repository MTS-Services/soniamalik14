import React from 'react';
import Container from '../../../components/layout/Container';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';

const CollaborateView = () => {

    return (
        <section className="py-6 lg:py-10 bg-[#F8FAFC]">
            <Container>
                <PageHeader
                    title="Collaborate with ESSA Hub"
                    subtitle="We're building a trusted space for women's sport aWe're building a trusted space for women's sport and we welcome organisations and businesses who want to be part of it."
                    backgroundImage="/images/Community.jpg"
                />

            </Container>
        </section>
    );
};

export default CollaborateView;
