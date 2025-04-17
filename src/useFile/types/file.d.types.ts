declare namespace FileTypes {
  type Options = {
    id?: string
    type?: 'image' | 'excel'
    size?: number
    length?: number
  }

  type Item = Partial<
    {
      file: File
      url: string
      originalName: string
      extension: string
      size: number
    } & API.PostFiles.Response
  >

  namespace API {
    namespace PostFiles {
      type Response = {
        originalname: string
        size: number
        location: string
      }
    }
  }
}
