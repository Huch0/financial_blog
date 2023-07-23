import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

const ShareBtn = ({ title, summary, url }) => {
  const [isShareSupported, setIsShareSupported] = useState(false)

  useEffect(() => {
    // 브라우저가 window.navigator.share 메서드를 지원하는지 체크
    setIsShareSupported(window.navigator.share ? true : false)
  }, [])

  const handleShareBtnClick = async () => {
    try {
      if (isShareSupported) {
        await window.navigator.share({
          title: title,
          text: summary,
          url: url,
        })
        console.log('공유 성공')
      } else {
        // window.navigator.share 메서드를 지원하지 않는 경우 클립보드에 복사
        await navigator.clipboard.writeText(`${url}`)
        alert('클립보드에 복사되었습니다.')
      }
    } catch (e) {
      console.log('공유 실패')
      console.error(e)
    }
  }

  return (
    // 버튼을 화면에 보여줌
    <button
      className="sharebtn relative z-10 flex rounded-md border p-2 opacity-80 hover:text-lg hover:opacity-100 focus:border-blue-400 focus:outline-none"
      onClick={handleShareBtnClick}
      aria-label="Share this post"
      type="button"
    >
      <span className="inline-block pr-4">게시글 공유하기</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="h-6 w-6 text-blue-700"
      >
        <path
          fill="currentColor"
          d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
        ></path>
      </svg>
    </button>
  )
}

export default ShareBtn
