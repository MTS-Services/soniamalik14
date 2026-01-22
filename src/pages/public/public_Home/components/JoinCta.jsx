import React from 'react';
import Container from '../../../../components/layout/Container';
import Button from '../../../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Title from '../../../../components/ui/Title';

const JoinCta = () => {
    return (
        <section className="py-12 lg:py-16">
            <Container>
                <div className="relative rounded-2xl overflow-hidden bg-btn-primary">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Left Content */}
                        <div className="px-12 lg:py-12 space-y-6 col-span-2 flex flex-col items-center lg:items-start lg:max-w-2xl ">
                            <h2 className="cta-title">
                                Your Journey in Women's Sport Starts Here
                            </h2>
                            
                            <p className="description text-white lg:text-left text-center">
                                ESSA Hub helps you find training, teams, events, and a supportive 
                                community — so you can take your first confident step and grow 
                                alongside women who share your passion for sport.
                            </p>
                            
                            <Button 
                                variant="outline" 
                                className="bg-white text-gray-900 hover:bg-gray-50 rounded-full px-6  gap-2"
                            >
                                Join ESSA Hub Today
                                <ArrowRight className="h-5 w-5 bg-btn-primary rounded-full text-white p-0.5" />
                            </Button>
                        </div>
                        
                        {/* Right Pattern Image */}
                        <div 
                            className="hidden lg:block  h-full"
                            style={{
                                backgroundImage: "url('/ctaBg.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        ></div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default JoinCta;