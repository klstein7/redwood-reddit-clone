import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      body: 'String',
      post: {
        create: { title: 'String', user: { create: { email: 'String' } } },
      },
      user: { create: { email: 'String' } },
    },
    two: {
      body: 'String',
      post: {
        create: { title: 'String', user: { create: { email: 'String' } } },
      },
      user: { create: { email: 'String' } },
    },
  },
})

export type StandardScenario = typeof standard
