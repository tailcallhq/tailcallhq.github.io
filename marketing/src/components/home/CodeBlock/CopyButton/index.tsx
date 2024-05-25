import React, {useCallback, useState, useRef, useEffect} from "react"
import clsx from "clsx"
import copy from "copy-text-to-clipboard"
import styles from "./styles.module.css"
import IconCopy from "./IconCopy"
import IconSuccess from "./IconSuccess"

type Props = {
  code: string
  className?: string
}

export default function CopyButton({code, className}: Props): JSX.Element {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeout = useRef<number | undefined>(undefined)
  const handleCopyCode = useCallback(() => {
    copy(code)
    setIsCopied(true)
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }, [code])

  useEffect(() => () => window.clearTimeout(copyTimeout.current), [])

  return (
    <div className="buttonGroup__atx">
    <button
      type="button"
      className={clsx("clean-btn", className, styles.copyButton, isCopied && styles.copyButtonCopied)}
      onClick={handleCopyCode}
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        <IconCopy className={styles.copyButtonIcon} />
        <IconSuccess className={styles.copyButtonSuccessIcon} />
      </span>
    </button>
    </div>
  )
}
