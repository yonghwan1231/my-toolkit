import { useForm, useFieldArray } from 'react-hook-form'
import type {
  DefaultValues,
  UseFormProps,
  FieldValues,
  Path,
  ArrayPath,
  FieldPath,
  PathValue,
} from 'react-hook-form'

export const useFormx = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(
  defaultValues: DefaultValues<TFieldValues>,
  options: UseFormProps<TFieldValues, TContext> = {
    mode: 'all',
  },
) => {
  const methods = useForm({
    defaultValues,
    ...options,
  })
  const { control, getValues, setValue, resetField } = methods

  const useArrayField = <TName extends ArrayPath<TFieldValues>>(
    name: TName,
  ) => {
    return useFieldArray<TFieldValues, TName>({
      control,
      name,
    })
  }

  const handleArrayField = <TName extends Path<TFieldValues>>(
    name: TName,
    value: PathValue<TFieldValues, TName>[number],
    mode: 'push' | 'remove' = 'push',
  ) => {
    if (!Array.isArray(getValues(name))) return
    if (!value) return
    const current = [...getValues(name)]
    if (mode === 'push') current.push(value)
    else current.splice(current.indexOf(value), 1)
    setValue(name, current as PathValue<TFieldValues, TName>)
  }

  const resetFields = (...fieldNames: FieldPath<TFieldValues>[]) => {
    fieldNames.forEach((fieldName) => resetField(fieldName))
  }
  return {
    ...methods,
    handleArrayField,
    useArrayField,
    resetFields,
  }
}
