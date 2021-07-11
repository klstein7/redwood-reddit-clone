import { Link, routes } from '@redwoodjs/router'

const PostDetailPage = () => {
  return (
    <>
      <h1>PostDetailPage</h1>
      <p>
        Find me in <code>./web/src/pages/PostDetailPage/PostDetailPage.tsx</code>
      </p>
      <p>
        My default route is named <code>postDetail</code>, link to me with `
        <Link to={routes.postDetail()}>PostDetail</Link>`
      </p>
    </>
  )
}

export default PostDetailPage
