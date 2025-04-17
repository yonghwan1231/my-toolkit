import { createPortal } from 'react-dom'
import { useModalStore } from 'useModal/store/modal.stroe'

export const GlobalModalsPortal = () => {
  const { modalStack, closeModal } = useModalStore()

  return createPortal(
    <>
      {modalStack.map(({ title, children, buttons, resolve, reject }, idx) => (
        <aside
          key={idx}
          className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[100]"
        >
          <div
            id="dim"
            onClick={() => {
              closeModal()
              if (reject) reject()
              else resolve(0)
            }}
            className="w-[100%] h-[100%] flex justify-center items-center"
          >
            <div
              className="border w-[400px] h-[300px]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>{title}</h2>
              <section>{children}</section>
              <section>
                {buttons?.map((button, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      button.onClick()
                    }}
                  >
                    {button.label}
                  </button>
                ))}
              </section>
            </div>
          </div>
        </aside>
      ))}
    </>,
    document.body,
  )
}
