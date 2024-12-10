import React, {useEffect, useMemo, useState} from "react"
import styles from "./styles.module.css"
import clsx from "clsx"
import {CookiePreferenceCategory} from "@site/src/constants"
import Link from "@docusaurus/Link"
import {pageLinks} from "@site/src/constants/routes"

interface CookieConsentModalProps {
  open: boolean
  onAccept: () => void
  onDeny: () => void
  onPartialAccept: (preferences: string[]) => void
  onClose?: () => void
}

interface ConsentOption {
  text: string
  onClick?: () => void
}

interface PreferenceOption {
  name: string
  selected: boolean
  readonly?: boolean
}

const CookieConsentModal: React.FC<CookieConsentModalProps> = ({open, onAccept, onDeny, onPartialAccept, onClose}) => {
  const [showPreferences, setShowPreferences] = useState(false)

  const consentOptions: Array<ConsentOption> = [
    {
      text: "Accept All",
      onClick: onAccept,
    },
    ...[
      showPreferences
        ? {
            text: "Accept Selected",
            onClick: () => {
              onPartialAccept(selectedPreferencesNames)
            },
          }
        : {
            text: "Manage Settings",
            onClick: () => setShowPreferences(true),
          },
    ],
    {
      text: "Deny",
      onClick: onDeny,
    },
  ]

  const initialPreferences: Array<PreferenceOption> = [
    {name: CookiePreferenceCategory.NECESSARY, selected: true, readonly: true},
    {name: CookiePreferenceCategory.PREFERENCE, selected: false},
    {name: CookiePreferenceCategory.MARKETING, selected: false},
    {name: CookiePreferenceCategory.ANALYTICS, selected: false},
  ]

  const [preferences, setPreferences] = useState(initialPreferences)

  const selectedPreferencesNames = useMemo(() => {
    return preferences.reduce((acc: string[], preference: PreferenceOption) => {
      if (preference.selected) acc.push(preference.name)
      return acc
    }, [])
  }, [preferences])

  const handlePreferenceToggle = (index: number) => {
    if (preferences[index].readonly) return

    const updatedPreferences = [...preferences]
    updatedPreferences[index].selected = !updatedPreferences[index].selected
    setPreferences(updatedPreferences)
  }

  const handleClose = () => {
    setShowPreferences(false)
    setPreferences(initialPreferences)

    if (onClose) onClose()
  }

  return (
    <>
      {open ? (
        <>
          {/* Modal Container */}
          <div
            className={clsx(
              "flex flex-col xl:flex-row xl:justify-between relative py-6 px-8 gap-4 sm:gap-12 xl:gap-0 font-space-mono bg-black rounded-xl",
              styles.cookieConsentModal,
            )}
          >
            <div className="flex flex-col gap-4 text-tailCall-light-300">
              <div className="flex flex-col gap-2">
                <span className="text-content-small font-bold xl:text-title-small">We Value Your Privacy</span>
                <span className="text-content-tiny xl:text-content-small">
                  This website uses cookies to ensure you receive the best possible experience.{" "}
                  <Link
                    href={pageLinks.privacyPolicy}
                    className="text-tailCall-light-300 hover:text-tailCall-light-300 underline"
                  >
                    Learn More
                  </Link>
                </span>
              </div>
              {showPreferences && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 sm:w-6/12 xl:w-full gap-6 xl:gap-8">
                  {preferences.map((preference: PreferenceOption, index: number) => {
                    return (
                      <span
                        key={index}
                        className={clsx(
                          "flex cursor-pointer text-content-tiny xl:text-content-small gap-2",
                          preference.selected ? "text-tailCall-light-600" : "",
                        )}
                        onClick={() => handlePreferenceToggle(index)}
                      >
                        <span className="whitespace-pre">{`${preference.selected ? `[ X ]` : `[   ]`}`}</span>
                        <span>{preference.name}</span>
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="flex items-end">
              <div
                className={clsx(
                  "flex flex-col sm:flex-row flex-1 gap-6 h-fit sm:justify-end",
                  styles.consentOptionsContainer,
                )}
              >
                {consentOptions.map((btn: ConsentOption, index: number) => {
                  return (
                    <span
                      key={index}
                      className={clsx(
                        "sm:whitespace-nowrap py-1 px-3 text-title-tiny bg-tailCall-dark-400 border border-solid border-tailCall-dark-300 cursor-pointer text-center",
                        styles.consentOption,
                      )}
                      onClick={btn.onClick}
                    >
                      {btn.text}
                    </span>
                  )
                })}
              </div>
            </div>
            <img
              className={clsx("absolute cursor-pointer", styles.closeBtn)}
              src={require("@site/static/images/cookie-consent/close-btn.png").default}
              height={16}
              width={25}
              onClick={handleClose}
            />
          </div>
        </>
      ) : null}
    </>
  )
}

export default CookieConsentModal
