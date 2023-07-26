import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import WikiLayout from '@/layouts/WikiLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllWikis } from '@/lib/wiki'
import kebabCase from '@/lib/utils/kebabCase'
import path from 'path'
import { useState } from 'react'

const root = process.cwd()

export async function getStaticPaths() {
  const paths = await getAllWikis('wikis')
  console.log('paths : ', paths)

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const wikis = await getAllFilesFrontMatter('wikis')
  //console.log('check', wikis)

  return { props: { wikis: wikis, wiki: params.wiki } }
}

export default function Wiki({ wikis, wiki }) {
  const selectedWiki = wiki;
  console.log('selected one = ', selectedWiki)


  return (
    <>
      <WikiLayout wikis={wikis} selectedWiki={selectedWiki}/>
    </>
  )
}
