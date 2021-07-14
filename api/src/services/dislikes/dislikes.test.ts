import {
  dislikes,
  dislike,
  createDislike,
  updateDislike,
  deleteDislike,
} from './dislikes'
import type { StandardScenario } from './dislikes.scenarios'

describe('dislikes', () => {
  scenario('returns all dislikes', async (scenario: StandardScenario) => {
    const result = await dislikes()

    expect(result.length).toEqual(Object.keys(scenario.dislike).length)
  })

  scenario('returns a single dislike', async (scenario: StandardScenario) => {
    const result = await dislike({ id: scenario.dislike.one.id })

    expect(result).toEqual(scenario.dislike.one)
  })

  scenario('creates a dislike', async (scenario: StandardScenario) => {
    const result = await createDislike({
      input: {
        postId: scenario.dislike.two.postId,
        userId: scenario.dislike.two.userId,
      },
    })

    expect(result.postId).toEqual(scenario.dislike.two.postId)
    expect(result.userId).toEqual(scenario.dislike.two.userId)
  })

  scenario('updates a dislike', async (scenario: StandardScenario) => {
    const original = await dislike({ id: scenario.dislike.one.id })
    const result = await updateDislike({
      id: original.id,
      input: { postId: scenario.dislike.two.postId },
    })

    expect(result.postId).toEqual(scenario.dislike.two.postId)
  })

  scenario('deletes a dislike', async (scenario: StandardScenario) => {
    const original = await deleteDislike({ id: scenario.dislike.one.id })
    const result = await dislike({ id: original.id })

    expect(result).toEqual(null)
  })
})
