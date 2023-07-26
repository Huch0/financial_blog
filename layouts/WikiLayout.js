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
      <div className="flex">
        {/* Left Navbar */}
        <div className="w-1/4 bg-gray-100 p-4 dark:bg-gray-800">
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
                    wiki.slug === selectedWiki ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
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

        {/* Main Content */}
        <div className="w-3/4 p-4">
          {/* Your main content goes here */}
          {/* For example, you can display the wiki content based on the selected link from the left navbar */}
          {selectedWiki && (
            <div>
              <h1 className="mb-4 text-2xl font-bold">{selectedWiki.title}</h1>
              <p>{selectedWiki.summary}</p>
              {/* Add more content related to the selected wiki */}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
