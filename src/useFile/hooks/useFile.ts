import { useState } from 'react'
// import { v4 as uuidv4 } from "uuid";
import { FileInput } from 'useFile/components/FileInput'

const fileExtensions = {
  image: ['jpg', 'jpeg', 'png', 'gif'],
  excel: ['xlsx'],
}

const defaultOption: Required<FileTypes.Options> = {
  id: '',
  type: 'image',
  size: 1,
  length: 1,
}

export const useFile = (options?: FileTypes.Options) => {
  const { type, size, length } = { ...defaultOption, ...options }
  const [files, setFiles] = useState<FileTypes.Item[]>([])
  const allowedExtensions = type ? fileExtensions[type] : ''

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): FileTypes.Item[] | void => {
    if (!e.target.files) return
    const copy = [...files]
    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index]
      const fileObj = {
        file,
        url: URL.createObjectURL(file),
        originalName: file.name,
        // fileName: uuidv4(),
        extension: file.name.split('.').pop()?.toLowerCase() as string,
        size: file.size,
        index,
      }
      if (type && !allowedExtensions.includes(fileObj.extension)) {
        return alert(
          `${allowedExtensions} 형식의 파일만 업로드 할 수 있습니다.`,
        )
      }
      if (size && file.size > size * 1024000) {
        return alert(`최대 ${size}MB까지 첨부 할 수 있습니다.`)
      }
      if (length !== 1 && copy.length >= length) {
        return alert(`최대 ${length}개까지 첨부 할 수 있습니다.`)
      }
      if (length === 1) {
        return setFiles([fileObj])
      } else {
        copy.push(fileObj)
      }
    }
    setFiles(copy)
    return copy
  }

  const removeFile = (idx: number): void => {
    const copy = [...files]
    copy.splice(idx, 1)
    setFiles(copy)
  }

  const FileUploader = FileInput({
    handleFile,
    multiple: length > 1 ? true : false,
  })

  return {
    FileUploader,
    files,
    setFiles,
    removeFile,
  }
}
