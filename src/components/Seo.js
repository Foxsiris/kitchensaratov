import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  getSiteOrigin,
  absoluteUrl,
  pageTitle,
} from '../config/seo';

/**
 * @param {object} props
 * @param {string} [props.title] — фрагмент для внутренних страниц (кроме главной: не передавать)
 * @param {string} [props.description]
 * @param {string} [props.path] — путь с ведущим /, для canonical
 * @param {string} [props.image] — путь или полный URL для og:image
 * @param {boolean} [props.noindex]
 * @param {'website'|'article'} [props.type]
 * @param {object | null} [props.jsonLd]
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image,
  noindex = false,
  type = 'website',
  jsonLd = null,
}) {
  const origin = getSiteOrigin();
  const pathNorm = path && path.startsWith('/') ? path : `/${path || ''}`;
  const canonical = origin ? `${origin}${pathNorm}` : undefined;
  const docTitle = pageTitle(title);
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE_PATH);

  return (
    <Helmet>
      <title>{docTitle}</title>
      <html lang="ru" />
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:title" content={docTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={docTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
