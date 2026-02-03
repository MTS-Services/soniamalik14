import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Container from '../../../components/layout/Container';
import { FaArrowLeft } from 'react-icons/fa';

const NewsDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const article = location.state?.article || {
    id: params.id || '1',
    title: "Women's Football League Season 2025 Kicks Off",
    date: 'Dec 1, 2025',
    author: 'Emma Rose',
    readingTime: '2 minute read',
    image: '/images/login/image_3.jpg',
    content: `The Women's Football League (WFL) Season 2025 has officially kicked off, ushering in a new wave of excitement, competition, and opportunity for women's football across the country. Featuring the nation's top clubs alongside emerging young talents, this season is widely expected to be one of the most competitive and engaging editions so far.

The opening matches have already shown strong intensity, skillful gameplay, and a renewed hunger among teams to make their mark. Fans can expect thrilling encounters, standout performers, and memorable moments throughout the season.`,
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] pb-8">
      <Container>
        <div className="mx-auto">
          <div className="relative w-full h-80 md:h-175 rounded-md overflow-hidden bg-gray-800 mt-4">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 px-6 md:px-12">
              <div className="absolute top-6 left-6 z-20">
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 bg-black/50 text-white px-3 py-1.5 rounded-md hover:bg-black/60 transition">
                  <FaArrowLeft />
                  <span className="text-sm">Back</span>
                </button>
              </div>

              <div className="h-full flex flex-col justify-center items-start">
                <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg max-w-3xl">{article.title}</h1>

                <div className="mt-4 text-sm text-white/80 flex items-center gap-4">
                  <span>by {article.author}</span>
                  <span>—</span>
                  <span>{article.readingTime}</span>
                </div>
              </div>
            </div>
          </div>

          <article className="mt-8">
            <div className="prose prose-sm md:prose-lg max-w-none text-[#333333]">
              <p>{article.content}</p>

              <div className="mt-10">
                <blockquote className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111111] leading-tight mb-8">
                  WFL 2025 is more than a tournament — it is a movement shaping the future of women's football.
                </blockquote>

                <ul className="list-disc ml-6 space-y-6 text-[#333]">
                  <li>Teams have entered the league after months of structured preparation, focusing heavily on tactical discipline, physical conditioning, and squad depth. Several clubs have strengthened their lineups with promising youth players and strategic signings, reflecting the league's growing emphasis on long-term development, sustainability, and performance consistency.</li>
                  <li>Beyond the action on the pitch, the 2025 season highlights continued progress in women's sports. Improved infrastructure, increased media coverage, and stronger fan engagement are helping elevate the league's professional standards. The Women's Football League remains a vital platform for nurturing talent, empowering female athletes, and inspiring the next generation of footballers.</li>
                  <li>As the season unfolds, fans can expect intense rivalries, high-quality performances, and memorable moments that will further elevate the profile of women's football nationwide and strengthen its impact on the sporting landscape.</li>
                </ul>

                <p className="mt-8">As the season unfolds, more detailed features and player interviews will be published here. Stay tuned for regular updates and insights.</p>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default NewsDetails;
