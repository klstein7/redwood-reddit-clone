import PostItem from './PostItem'
import { standard } from './PostItem.mock'

export const generated = () => {
  return <PostItem post={standard().post} />
}

export default { title: 'Components/PostItem' }
