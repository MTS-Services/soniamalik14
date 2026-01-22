import React from 'react';
import CallToAction from '../../../../components/ui/CallToAction';

const AboutCta = () => {
    const handleExplore = () => {
        // add navigation or modal open logic here
        console.log('Explore clicked');
    };

    return (
        <CallToAction
            title={"Join the ESSA HUB Community"}
            description={"Whether you're a player, club, coach, or service provider, ESSA HUB is here to support your journey in sport. Discover opportunities. Build confidence. Grow together."}
            buttonText={"Explore"}
            onButtonClick={handleExplore}
            backgroundImage={'/aboutCta.png'}
            showArrow={true}
        />
    );
};

export default AboutCta;