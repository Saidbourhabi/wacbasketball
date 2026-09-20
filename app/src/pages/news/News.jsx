import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { getAllNews } from '../../utils/contentful';
import NewsCard from '../../components/news/NewsCard';
import bannerImage from '../../assets/banner.webp';
import { Helmet } from 'react-helmet-async';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: "Men's", value: 'mens-basketball' },
  { label: "Women's", value: 'womens-basketball' },
  { label: 'Club', value: 'the-club' },
  { label: 'Academy', value: 'academy' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      setLoading(true);
      const data = await getAllNews();
      if (isMounted) {
        setArticles(data.filter((a) => a.published === true));
        setLoading(false);
      }
    }

    fetchNews();
    return () => {
      isMounted = false;
    };
  }, []);

  const getFilteredArticles = (categoryValue) => {
    if (categoryValue === 'all') return articles;
    return articles.filter((a) => a.category === categoryValue);
  };

  if (loading) {
    return (
      <section className="mt-16">
        <div className="flex min-h-100 w-full items-center justify-center bg-[#fc0000] sm:min-h-125">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      </section>
    );
  }

  return (
    <section className="my-12">
        <Helmet >
          <title>News - Latest News</title>
          <meta name="description" content="This is the latest news page." />
          <link rel="canonical" href="https://wacbasketball.vercel.app/news" />
        </Helmet>
      {/* Page Banner */}
      <div
        className="relative flex min-h-50 w-full items-center justify-start bg-cover bg-center bg-no-repeat md:min-h-90"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#fc0000b2]" />
        {/* Banner Content — vertically centered, left-aligned */}
        <div className="relative z-10 mx-auto w-full max-w-md px-6 text-left sm:max-w-3xl md:px-8 lg:max-w-6xl">
          <h2 className=" text-3xl font-bold text-white md:text-4xl">
            Latest News
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-black">
            Stay up to date with the latest stories, insights, and updates from
            the world of basketball and beyond.
          </p>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="px-4 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
          <Tab.Group>
            <Tab.List className="mb-8 flex flex-wrap gap-1">
              {CATEGORIES.map((cat) => (
                <Tab
                  key={cat.value}
                  className={({ selected }) =>
                    classNames(
                      'cursor-pointer px-5 py-2.5 text-sm font-medium transition-colors ',
                      selected
                        ? 'bg-[#fc0000] text-white'
                        : 'bg-transparent text-black hover:bg-[#fc0000] hover:text-white'
                    )
                  }
                >
                  {cat.label}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {CATEGORIES.map((cat) => {
                const filtered = getFilteredArticles(cat.value);
                return (
                  <Tab.Panel key={cat.value} className="focus:outline-none">
                    {filtered.length === 0 ? (
                      <div className="py-16 text-center">
                        <p className="text-lg text-slate-500">
                          No articles found in this category.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {filtered.map((article) => (
                          <NewsCard key={article.id} article={article} />
                        ))}
                      </div>
                    )}
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
}