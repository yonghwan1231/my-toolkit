import { useMutation, useQuery } from '@tanstack/react-query'
import { createQueryKeyFactory } from 'reactQueryToolkit/utils/createQueryKeyFactory'
import { sampleApis } from './apis'

export const SAMPLE_QUERY_KEYS = createQueryKeyFactory(sampleApis, 'sample')

// 게임

export const useGetPostList = (params: string) => {
  return useQuery({
    queryKey: [...SAMPLE_QUERY_KEYS.getPostList, params],
    queryFn: () => sampleApis.list.getPostList(params),
  })
}

export const useGetPostDetail = (id: string) => {
  return useQuery({
    queryKey: [...SAMPLE_QUERY_KEYS.getPostDetail, id],
    queryFn: () => sampleApis.detail.getPostDetail(id),
    enabled: !!id,
  })
}

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (body: BodyInit) => sampleApis.update.createPost(body),
  })
}

export const useUpdatePost = (id: string) => {
  return useMutation({
    mutationFn: (body: BodyInit) => sampleApis.update.updatePost(id, body),
  })
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: string) => sampleApis.delete.deletePost(id),
  })
}

export default SAMPLE_QUERY_KEYS
