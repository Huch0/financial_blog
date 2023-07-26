import siteMetadata from '@/data/siteMetadata'
import WikiLayout from '@/layouts/WikiLayout'
import { PageSEO } from '@/components/SEO'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const wikis = await getAllFilesFrontMatter('wikis')

  return { props: { wikis } }
}

export default function Wikis({ wikis }) {
  return (
    <>
      <PageSEO
        title={`위키 - 경제금융용어 700선`}
        description="경제 금융 용어 700가지를 알기 쉽게 정리해 놓은 위키 페이지입니다."
      />
      <WikiLayout wikis={wikis} title="위키" />
    </>
  )
}
