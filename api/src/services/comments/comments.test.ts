import {
  comments,
  comment,
  createComment,
  updateComment,
  deleteComment,
} from './comments'
import type { StandardScenario } from './comments.scenarios'

describe('comments', () => {
  scenario('returns all comments', async (scenario: StandardScenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })

  scenario('returns a single comment', async (scenario: StandardScenario) => {
    const result = await comment({ id: scenario.comment.one.id })

    expect(result).toEqual(scenario.comment.one)
  })

  scenario('creates a comment', async (scenario: StandardScenario) => {
    const result = await createComment({
      input: {
        body: 'String',
        postId: scenario.comment.two.postId,
        userId: scenario.comment.two.userId,
      },
    })

    expect(result.body).toEqual('String')
    expect(result.postId).toEqual(scenario.comment.two.postId)
    expect(result.userId).toEqual(scenario.comment.two.userId)
  })

  scenario('updates a comment', async (scenario: StandardScenario) => {
    const original = await comment({ id: scenario.comment.one.id })
    const result = await updateComment({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('deletes a comment', async (scenario: StandardScenario) => {
    const original = await deleteComment({ id: scenario.comment.one.id })
    const result = await comment({ id: original.id })

    expect(result).toEqual(null)
  })
})
