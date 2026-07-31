import { restOfSiteHtml } from './restOfSiteHtml'

/**
 * Below-fold page content preserved from the prior static site.
 * Not modified — only asset paths point at /public.
 */
export default function RestOfSite() {
  return (
    <div
      className="site-rest"
      dangerouslySetInnerHTML={{ __html: restOfSiteHtml }}
    />
  )
}
