import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.findUnique({
    where: { id },
  })
}

interface CreateUserArgs {
  input: Prisma.UserCreateInput
}

export const createUser = ({ input }: CreateUserArgs) => {
  return db.user.create({
    data: input,
  })
}

interface UpdateUserArgs extends Prisma.UserWhereUniqueInput {
  input: Prisma.UserUpdateInput
}

export const updateUser = ({ id, input }: UpdateUserArgs) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

interface UpsertUserArgs {
  input: Prisma.UserCreateInput
}

export const upsertUser = ({ input }: UpsertUserArgs) => {
  return db.user.upsert({
    where: { id: input.id },
    update: {
      email: input.email,
      name: input.name,
    },
    create: {
      id: input.id,
      email: input.email,
      name: input.name,
    },
  })
}

export const deleteUser = ({ id }: Prisma.UserWhereUniqueInput) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  posts: (_obj, { root }: ResolverArgs<ReturnType<typeof user>>) =>
    db.user.findUnique({ where: { id: root.id } }).posts(),
}
