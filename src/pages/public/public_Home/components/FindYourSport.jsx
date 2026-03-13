import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../../../../components/layout/Container'
import SectionHeader from '../../../../components/ui/SectionHeader'

const tiles = [
    { id: 1, title: 'Football', img: '/images/Football.jpg', sport: 'football' },
    { id: 2, title: 'Padel', img: '/images/Padel.jpg', sport: 'padel' },
    { id: 3, title: 'Squash', img: 'images/Squash.jpg', sport: 'squash' },
]

const FindYourSport = () => {
    return (
        <section className="py-14 lg:py-16 bg-[#E7F1F1]">
            <Container>
                <div className="text-center mb-4 lg:mb-6">
                  <h2 className="font-bold text-[#0B544E]  text-2xl sm:text-3xl md:text-4xl lg:text-5xl " >
                    Find your sport. Find your squad.
                  </h2>
                </div>
                <p className="text-center text-gray-600 text-base mb-8 max-w-2xl mx-auto">
                  We're expanding our sports and local listings. If you can't find what you're looking for yet, help us shape what comes next.
                </p>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full container">
                        {tiles.map((t) => (
                            <Link
                                key={t.id}
                                to={`/find-sport?sport=${encodeURIComponent(t.sport)}`}
                                className="block w-full rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="relative flex flex-col h-full">
                                    <img src={t.img} alt={t.title} className="w-full h-72 md:h-85 lg:h-160 object-cover block" />
                                    <div className="absolute left-0 right-0 bottom-0 bg-[#0d6b62] text-white py-3 md:py-4 lg:py-8 px-4">
                                        <span className="font-semibold text-2xl lg:text-3xl">{t.title}</span>
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
