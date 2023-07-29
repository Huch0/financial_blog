import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'

export default function WikiLayout({ wikis, selectedWiki }) {
  const [searchValue, setSearchValue] = useState('')

  const filteredWikiPages = wikis.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayWikis = !searchValue ? wikis : filteredWikiPages

  return (
    <>
      <div className=" p-4 dark:bg-gray-800">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="용어 검색하기"
            className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-gray-800 focus:outline-none focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-600"
          />
        </div>

        {/* Wiki Links */}
        <nav>
          <ul>
            {displayWikis.map((wiki) => (
              <li
                key={wiki.title}
                className={`mb-2 ${
                  wiki.slug === selectedWiki
                    ? 'bg-blue-50 text-blue-500 dark:bg-gray-600 dark:text-white   '
                    : 'hover:bg-gray-100 dark:hover:bg-indigo-500'
                }`}
              >
                <Link href={`/wikis/${wiki.slug}`} className="block py-2 px-4">
                  {wiki.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
