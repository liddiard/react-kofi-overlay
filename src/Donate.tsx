'use client'

import React, { useState, CSSProperties } from 'react'
import classes from 'classnames'

import s from './Donate.module.scss'
import { IconContext } from 'react-icons'
import { BsX as CloseIcon } from 'react-icons/bs'


export interface StyleDefs<T> {
  /**
   * Donate button – a <button> element.
   */
  donateBtn?: T
  /**
   * Panel wrapper that popus up when donate button is clicked. By default,
   * the panel is anchored to the bottom right of the viewport on desktop and
   * full screen on mobile.
   */
  panel?: T
  /**
   * Button to close the donate panel.
   */
  closeBtn?: T
  /**
   * (X) icon within the panel close button.
   */
  closeIcon?: T
  /**
   * Link to your Ko-fi profile. By default, it's anchored to the bottom of the donate panel.
   */
  profileLink?: T
}

export interface DonateProps {
  /**
   * Child nodes of the donate button. E.g., "Support me on Ko-fi"
   */
  children: React.ReactNode
  /**
   * Your Ko-fi profile name. (ko-fi.com/[username])
   */
  username: string
  /**
   * Optional custom class names to apply to the component.
   */
  classNames?: StyleDefs<string>
  /**
   * Optional custom styles to apply to the component.
   */
  styles?: StyleDefs<CSSProperties>
  /** 
   * Optional function to be called when the donation form is opened or closed.
   */
  onToggle?: (open: boolean) => void
}

/**
 * Component to display a button that opens a Ko-fi donation panel when clicked.
 *
 * @component
 * @example
 * <Donate username="liddiard">
 *   Support My Work
 * </Donate>
 */
export default function Donate({
  children,
  username,
  classNames = {},
  styles = {},
  onToggle = () => {}
}: DonateProps) {
  const baseUrl = `https://ko-fi.com/${username}`
  const [open, setOpen] = useState(false)

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    onToggle(isOpen)
  }

  return (
    <>
      <button 
        className={classes(s.donateBtn, classNames.donateBtn)}
        style={styles.donateBtn}
        onClick={() => handleOpen(!open)}
      >
        {children}
      </button>
      {open ? 
        <div 
          className={classes(s.panel, classNames.panel)}
          style={styles.panel}
        >
          <button
            className={classes(s.closeBtn, classNames.closeBtn)}
            style={styles.closeBtn}
            onClick={() => handleOpen(false)}
          >
            <IconContext.Provider value={{
              className: classes(s.closeIcon, classNames.closeIcon),
              style: styles.closeIcon
            }}>
              <CloseIcon title="Close" />
            </IconContext.Provider>
          </button>
          <iframe src={`${baseUrl}?hidefeed=true&widget=true&embed=true`} />
          <div
            className={classes(s.profileLink, classNames.profileLink)}
            style={styles.profileLink}
          >
            <a href={baseUrl} target="_blank" rel="noreferrer">
              ko-fi.com/{username}
            </a>
          </div>
        </div>
      : null}
    </>
  )
}
