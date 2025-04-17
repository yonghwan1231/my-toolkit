import { useRef } from 'react'

type OwnProps = {
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  multiple: boolean
}

export const FileInput = ({ handleFile, multiple }: OwnProps) => {
  const fileRef = useRef(null)

  return ({
    id,
    onChange,
  }: {
    id: string
    onChange?: (files: FileTypes.Item[]) => void
  }) => (
    <input
      id={id}
      ref={fileRef}
      type="file"
      style={{ display: 'none' }}
      onChange={(e) => {
        const newFiles = handleFile(e)
        if (onChange && newFiles) onChange(newFiles)
        else handleFile(e)
        fileRef.current = null
      }}
      multiple={multiple}
    />
  )
}
