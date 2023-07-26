import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import WikiLayout from '@/layouts/WikiLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter, getFileBySlug } from '@/lib/mdx'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getAllWikis } from '@/lib/wiki'
import kebabCase from '@/lib/utils/kebabCase'
import path from 'path'
import { useState } from 'react'

const DEFAULT_LAYOUT = 'WikiPageLayout'
const root = process.cwd()

export async function getStaticPaths() {
  const paths = await getAllWikis('wikis')
  console.log('paths : ', paths)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const wikis = await getAllFilesFrontMatter('wikis')
  console.log('params', params)

  const wiki = await getFileBySlug('wikis', params.wiki)
  const authorList = wiki.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  return { props: { wikis, wiki, authorDetails } }
}

export default function Wiki({ wikis, wiki, authorDetails }) {
  const selectedWiki = wiki.slug
  const { mdxSource, toc, frontMatter } = wiki

  console.log('\nwiki.slug = ', wiki.slug)
  console.log('selected one = ', selectedWiki)

  return (
    <>
      <MDXLayoutRenderer
        layout={frontMatter.layout || DEFAULT_LAYOUT}
        toc={toc}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
        authorDetails={authorDetails}
        wikis={wikis}
        selectedWiki={selectedWiki}
      />
    </>
  )
}
