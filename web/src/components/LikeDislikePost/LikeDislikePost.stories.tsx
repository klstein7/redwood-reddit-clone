import LikeDislikePost from './LikeDislikePost'
import { standard } from './LikeDislikePost.mock'

export const unauthenticated = () => {
  return (
    <LikeDislikePost
      postId={standard().postId}
      voteCount={standard().voteCount}
    />
  )
}

export const authenticated = () => {
  mockCurrentUser({
    sub: '123',
  })
  return (
    <LikeDislikePost
      postId={standard().postId}
      voteCount={standard().voteCount}
    />
  )
}

export default { title: 'Components/LikeDislikePost' }
