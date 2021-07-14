import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const comments = () => {
  return db.comment.findMany()
}

export const comment = ({ id }: Prisma.CommentWhereUniqueInput) => {
  return db.comment.findUnique({
    where: { id },
  })
}

interface CommentsForPostArgs {
  postId: string
}

export const rootCommentsForPost = ({ postId }: CommentsForPostArgs) => {
  return db.comment.findMany({
    where: { postId, parentId: null },
  })
}

interface ChildrenCommentsForParentArgs {
  parentId: string
}

export const childrenCommentsForParent = ({
  parentId,
}: ChildrenCommentsForParentArgs) => {
  return db.comment.findMany({
    where: { parentId: parentId },
  })
}

interface CreateCommentArgs {
  input: Prisma.CommentCreateInput
}

export const createComment = ({ input }: CreateCommentArgs) => {
  return db.comment.create({
    data: { ...input, userId: context.currentUser.sub },
  })
}

interface UpdateCommentArgs extends Prisma.CommentWhereUniqueInput {
  input: Prisma.CommentUpdateInput
}

export const updateComment = ({ id, input }: UpdateCommentArgs) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment = ({ id }: Prisma.CommentWhereUniqueInput) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment = {
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).post(),
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).user(),
  parent: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).parent(),
  comments: (_obj, { root }: ResolverArgs<ReturnType<typeof comment>>) =>
    db.comment.findUnique({ where: { id: root.id } }).comments(),
}
