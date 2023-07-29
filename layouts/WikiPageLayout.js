import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ShareBtn from '@/components/ShareBtn'
import WikiLayout from '@/layouts/WikiLayout'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const WikiPageLayout = ({ frontMatter, authorDetails, wikis, selectedWiki, children }) => {
  const { slug, fileName, date, title, summary, images, tags } = frontMatter

  const handleArrowClick = () => {
    setTagVisible(!isTagVisible)
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopAndComment />
      <div className="mt-10 flex flex-wrap">
        <div className="w-full sm:w-1/4 max-h-30 sm:max-h-none overflow-y-auto">
          <WikiLayout wikis={wikis} selectedWiki={selectedWiki} />
        </div>
        <article className="w-full px-5 sm:w-3/4">
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-6">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
            </header>

            <div className="divide-y pb-8 dark:divide-gray-700" style={{ display: 'flex' }}>
              <div className="xl:col-span-3" style={{ flex: '1' }}>
                <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">{children}</div>
                <div className="pt-6 pb-6">
                  <ShareBtn
                    title={title}
                    summary={summary}
                    url={`${siteMetadata.siteUrl}/wikis/${slug}`}
                  />
                </div>
              </div>
            </div>

            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      태그
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </article>
      </div>
    </SectionContainer>
  )
}
export default WikiPageLayout
