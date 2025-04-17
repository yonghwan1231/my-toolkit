import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useModalStore } from 'useModal/store/modal.stroe'

export const useModal = () => {
  const { alert, confirm } = useGlobalModal()
  const { custom, CustomModalPortal } = useCustomModal()
  const { closeModal, clearModalStack } = useModalStore()

  return {
    open: { alert, confirm, custom },
    CustomModalPortal,
    closeModal,
    clearModalStack,
  }
}

type AlertTitle = '삭제되었습니다.' | '저장되었습니다.' | '준비중입니다.'

type ConfirmTitles = '삭제하시겠습니까?' | '저장하시겠습니까?'

type ModalParamsType<T extends string> = {
  title: T
  buttons?: string[]
  closeButtons?: number[]
  rejectButtons?: number[]
  children?: React.ReactNode
  custom?: boolean
}

const useGlobalModal = () => {
  const { addModal, closeModal } = useModalStore()

  const alert = <T extends string = AlertTitle>({
    title,
  }: ModalParamsType<T>) => {
    return new Promise((resolve) => {
      const modalContext = {
        title,
        buttons: [
          {
            label: '확인',
            onClick: () => {
              resolve(true)
              closeModal()
            },
          },
        ],
        resolve,
      }
      addModal(modalContext)
    })
  }

  const confirm = <T extends string = ConfirmTitles>({
    title,
    buttons = ['취소', '확인'],
    closeButtons,
    rejectButtons = [0],
  }: ModalParamsType<T>) => {
    return new Promise((resolve, reject) => {
      closeButtons = closeButtons || buttons.map((_, idx) => idx)
      const newButtons = buttons.map((label, idx) => ({
        label,
        onClick: () => {
          if (rejectButtons.includes(idx)) reject()
          else resolve(idx)
          if (closeButtons?.includes(idx)) closeModal()
        },
      }))
      const modalContext = {
        title,
        buttons: newButtons,
        resolve,
        reject,
      }
      addModal(modalContext)
    })
  }

  return {
    alert,
    confirm,
  }
}

type CustomModalPropsType = {
  close: () => void
  fromParent: unknown
  toParent: (value: unknown) => void
}

type CustomModalType<P = object> = (
  props: CustomModalPropsType & P,
) => React.JSX.Element

type CustomModalParamsType<P> = {
  component: CustomModalType<P>
  toChild?: unknown
}

const useCustomModal = () => {
  const [customModal, setCustomModal] = useState<CustomModalType>()
  const [fromParent, setFromParent] = useState<unknown>()
  const [toParent, setToParent] = useState<(value: unknown) => void>(() => {})

  const custom = <P>({ component, toChild }: CustomModalParamsType<P>) => {
    if (toChild) setFromParent(toChild)
    return new Promise((resolve) => {
      setCustomModal(() => component as CustomModalType)
      setToParent(() => (value: unknown) => {
        resolve(value)
        setCustomModal(undefined)
      })
    })
  }

  const close = () => {
    setCustomModal(undefined)
  }

  const CustomModalPortal = <P>(props: CustomModalPropsType | P) => {
    if (!customModal) return null
    const defaultProps = { ...props, close, fromParent, toParent }
    return createPortal(customModal(defaultProps), document.body)
  }

  return {
    custom,
    CustomModalPortal,
  }
}
