import React, { useMemo, useState } from 'react'
import Container from '../../../components/layout/Container'
import Button from '../../../components/ui/Button'
import { Bell } from 'lucide-react'


const sampleBrands = [
    {
        id: 1,
        name: 'IDA Sports',
        sport: 'Football',
        logo: 'https://i.ibb.co.com/YF44kMmL/Press-Blog-Image-1600x.webp',
        description: 'Football boots engineered specifically for women’s foot shape. Designed for performance fit and comfort at every level.',
        url: 'https://idasports.com',
    },
    {
        id: 2,
        name: 'Gilbert Netball',
        sport: 'Netball',
        logo: 'https://i.ibb.co.com/V0JTnmHm/images.png',
        description: 'Official netball equipment supplier offering performance balls, kits and training gear.',
        url: 'https://www.gilbert-netball.com',
    },
    {
        id: 3,
        name: 'Nike',
        sport: 'Multi-sport',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
        description: 'Global sportswear brand providing training, running, football and lifestyle products.',
        url: 'https://www.nike.com',
    },
    {
        id: 4,
        name: 'Adidas',
        sport: 'Padel',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
        description: 'Performance padel rackets and apparel designed for power, control and comfort.',
        url: 'https://www.adidas.com',
    }
]

const BrandCard = ({ brand }) => {
    return (
        <div className="bg-white border rounded-2xl p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200" style={{ borderColor: '#B5D5D2', minHeight: '360px' }}>
            <div>
                <div className="relative">
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                        <span className="text-sm bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-semibold">{brand.sport}</span>
                    </div>
                    <div className="h-46 flex items-center justify-center mb-4">
                        {brand.logo ? (
                            <img src={brand.logo} alt={`${brand.name} logo`} className="max-h-24 object-contain" />
                        ) : (
                            <div className="w-full h-24 bg-gray-100 flex items-center justify-center">Logo</div>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-[#282828] mb-2">{brand.name}</h3>
                <p className="text-base text-gray-700 mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{brand.description}</p>
            </div>

            <div className="mt-4">
                <a href={brand.url} target="_blank" rel="noreferrer">
                    <Button variant="primary" className="w-full rounded-lg bg-btn-primary text-white hover:bg-[#0d655d]">
                        Shop Brand
                    </Button>
                </a>
            </div>
        </div>
    )
}

const MarketPlaceView = () => {
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        const q = (query || '').trim().toLowerCase()
        if (!q) return sampleBrands
        return sampleBrands.filter((b) => b.name.toLowerCase().includes(q) || (b.sport || '').toLowerCase().includes(q))
    }, [query])

    return (
        <section className="py-6 lg:py-10">
            <Container>
                <div className="mb-6">
                    <h1 className="sectiontitle mb-2 tracking-tight">Curated brands across women’s sport.</h1>
                    <p className="text-gray-700 mt-2">Find brands focused on women's performance, comfort and fit.</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
                    <div className="flex-1 max-w-lg w-full">
                        <div className="relative bg-white rounded-lg px-4 py-2.5 border border-[#e6e6e6]">
                            <input
                                type="search"
                                placeholder="Search brands or sport"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full outline-none text-base text-gray-700"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button disabled className="w-full sm:w-auto bg-white border border-[#B5D5D2] text-gray-700 px-4 py-2.5 rounded-lg flex items-center justify-between gap-3">
                            <span className="text-left">Shop Brands </span>

                        </button>
                        <button disabled className="w-full sm:w-auto bg-white border border-[#B5D5D2] text-gray-700 px-4 py-2.5 rounded-lg flex items-center justify-between gap-3">
                            <span className="text-left"> Pre-Loved</span>
                            <span className="text-xs bg-[#0d655d] text-white px-2 py-1 rounded-full font-semibold">Coming soon</span>
                        </button>
                        <button disabled className="w-full sm:w-auto bg-white border border-[#B5D5D2] text-gray-700 px-4 py-2.5 rounded-lg flex items-center justify-between gap-3">
                            <span className="text-left">List your item</span>
                            <span className="text-xs bg-[#0d655d] text-white px-2 py-1 rounded-full font-semibold">Coming soon</span>
                        </button>
                    </div>
                </div>

                {/* Brand Grid */}
                {filtered.length === 0 ? (
                    <div className="bg-white border rounded-2xl p-6 text-center" style={{ borderColor: '#B5D5D2' }}>
                        <h3 className="text-xl font-semibold mb-2">No brands found</h3>
                        <p className="text-gray-700 mb-4">We couldn't find any brands that match "{query}". Try widening your search or clear the search to see all brands.</p>
                        <div className="flex justify-center">
                            <Button onClick={() => setQuery('')} variant="primary" className="px-4 py-2 rounded-lg">Clear search</Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((b) => (
                            <BrandCard key={b.id} brand={b} />
                        ))}
                    </div>
                )}

                {/* Pre-Loved Section */}

                <div className="mt-12  ">
                    <section id="pre-loved" className="bg-[#E7F1F1] rounded-3xl p-8 md:p-16 border border-[#B5D5D2] relative overflow-hidden">
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-6">

                                <span className="inline-flex items-center text-sm uppercase bg-[#0d655d] text-white px-3 py-1 rounded-full tracking-widest">Coming soon</span>

                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pre-Loved From the ESSA Community</h2>
                            <p className="text-indigo-900/60 text-lg mb-8 leading-relaxed">
                                A space to buy and sell pre-loved sports kit within the ESSA community. Extend the life of your gear and support fellow female athletes.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="primary"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4  text-white rounded-lg font-bold  transition-all "
                                >
                                    <Bell size={20} />
                                    Notify Me
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </Container>
        </section>
    )
}

export default MarketPlaceView
