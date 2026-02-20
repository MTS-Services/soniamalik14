import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../../components/layout/Container'
import SectionHeader from '../../../../components/ui/SectionHeader'

const tiles = [
    { id: 1, title: 'Football', img: 'https://i.ibb.co.com/whwV45L2/71815299707b2a29a3a530becb1cb7289e4edc91.jpg', sport: 'football' },
    { id: 2, title: 'Padel', img: 'https://i.ibb.co.com/ccLY62VL/full-shot-woman-playing-paddle-tennis-23-2149434152.avif', sport: 'padel' },
    { id: 3, title: 'Squash', img: '/player3.jpg', sport: 'squash' },
]

const FindYourSport = () => {
    return (
        <section className="py-8">
            <Container>
                <SectionHeader
          title="Find your sport. Find your squad "
         
          align="center"
          className="mb-4 lg:mb-6 text-xl lg:text-2xl"
        />

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full max-w-4xl">
                        {tiles.map((t) => (
                            <Link
                                key={t.id}
                                to={`/find-sport?sport=${encodeURIComponent(t.sport)}`}
                                className="block w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="relative flex flex-col h-full">
                                    <img src={t.img} alt={t.title} className="w-full h-72 md:h-80 lg:h-96 object-cover block" />
                                    <div className="absolute left-0 right-0 bottom-0 bg-[#0d6b62] text-white py-3 px-4">
                                        <span className="font-semibold text-base md:text-base">{t.title}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FindYourSport
