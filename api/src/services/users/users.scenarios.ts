import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: { one: { email: 'String859000' }, two: { email: 'String3120343' } },
})

export type StandardScenario = typeof standard
