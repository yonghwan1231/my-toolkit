export const sampleApis = {
  list: {
    getPostList: (params: string) => {
      return fetch(`?${params}`)
    },
  },

  detail: {
    getPostDetail: (id: string) => {
      return fetch(`/${id}`)
    },
  },

  update: {
    createPost: (body: BodyInit) => {
      return fetch(``, { method: 'POST', body })
    },

    updatePost: (id: string, body: BodyInit) => {
      return fetch(`/${id}`, { method: 'POST', body })
    },
  },

  delete: {
    deletePost: (id: string) => {
      return fetch(`/${id}`)
    },
  },

  utility: {},
}
