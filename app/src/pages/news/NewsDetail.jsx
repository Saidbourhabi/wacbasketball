import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { FaArrowLeft, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { getNewsBySlug } from '../../utils/contentful';

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-6 text-lg leading-relaxed text-slate-700">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="mb-6 mt-10 text-3xl font-bold text-black">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="mb-4 mt-8 text-2xl font-semibold text-slate-900">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold text-slate-900">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-[#fc0000]">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-slate-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="my-8 border-l-4 border-brand-red bg-slate-50 py-4 pl-6 pr-4 text-lg italic text-slate-700">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#fc0000] underline decoration-2 underline-offset-2 hover:text-red-700"
      >
        {children}
      </a>
    ),
  },
};

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchArticle() {
      setLoading(true);
      setError(false);
      const data = await getNewsBySlug(slug);
      if (isMounted) {
        if (data && data.published) {
          setArticle(data);
        } else {
          setError(true);
        }
        setLoading(false);
      }
    }

    fetchArticle();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="mt-16">
        <div className="flex min-h-80 w-full items-center justify-center bg-[#fc0000] sm:min-h-125">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      </section>
    );
  }

  if (error || !article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">Article Not Found</h1>
        <p className="mb-8 text-slate-600">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
        >
          <FaArrowLeft /> Back to News
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-8">
      <Link
        to="/news"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#fc0000]"
      >
        <FaArrowLeft /> Back to News
      </Link>

      <header className="mb-8">
        <span className="mb-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {article.category.replace(/-/g, ' ')}
        </span>
        <h1 className="mb-4 text-3xl font-bold leading-tight text-[#fc0000] md:text-4xl lg:text-5xl">
          {article.headline}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaUser className="text-[#fc0000]" />
            {article.authorName}
          </span>
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-[#fc0000]" />
            {formattedDate}
          </span>
        </div>
      </header>

        {article.image && (
          <div className="mb-10 overflow-hidden rounded-xl">
            <div className="relative aspect-16/10 w-full sm:aspect-video lg:aspect-21/9 lg:max-h-130">
              <img
                src={article.image}
                alt={article.headline}
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>
        )}

      <div className="prose max-w-none">
        {article.content && documentToReactComponents(article.content, renderOptions)}
      </div>
    </article>
  );
}