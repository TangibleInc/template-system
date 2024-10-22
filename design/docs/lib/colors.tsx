/**
 * Colors - TODO: Create from design tokens in JSON format
 */
import React, { useEffect, useState, useRef } from 'react'
// import Layout from '@theme/Layout'
import styles from './colors.module.scss'

const baseColors = [
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
  // 'black',
  // 'white',
  'gray',
]

const grades = [100, 200, 300, 400, 500, 600, 700, 800, 900]

function getRGB(c) {
  return parseInt(c, 16) || c
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}

function getContrast(f, b) {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, '#ffffff')
  const blackContrast = getContrast(bgColor, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

const isBrightBackground = (bgColor) =>
  getContrast(bgColor, '#ffffff') < getContrast(bgColor, '#555555')

const SassVariable = ({ name, color }) => (
  <div
    style={{
      color: isBrightBackground(color) ? '#000' : '#fff',
      // backgroundColor: 'rgba(255, 255, 255, .2)',
      padding: '.25rem .25rem',
      border: 'none'
    }}
  >
    {name}
  </div>
)

export default function Colors() {
  const containerRef = useRef()
  const [state, setState] = useState({
    theme: {},
    allColors: {},
  })
  useEffect(function () {
    const style = getComputedStyle(containerRef.current || document.body)
    const theme = {
      primary: style.getPropertyValue('--t-primary'),
      secondary: style.getPropertyValue('--t-secondary'),
      success: style.getPropertyValue('--t-success'),
      info: style.getPropertyValue('--t-info'),
      warning: style.getPropertyValue('--t-warning'),
      danger: style.getPropertyValue('--t-danger'),
      light: style.getPropertyValue('--t-light'),
      dark: style.getPropertyValue('--t-dark'),
    }

    const allColors: {
      [baseColor: string]: {
        [grade: number]: string
      }
    } = {}

    for (const baseColor of baseColors) {
      allColors[baseColor] = {}
      for (const grade of grades) {
        allColors[baseColor][grade] = style.getPropertyValue(
          `--t-${baseColor}-${grade}`,
        )
      }
    }

    // console.log('theme', theme)
    // console.log('styles', styles)
    // console.log('allColors', allColors)

    setState({
      theme,
      allColors,
    })
  }, [])

  return (
    <div ref={containerRef} className={styles.allColors}>
      <section>
        <h2>Theme colors</h2>
        <div className={styles.colorList}>
          {Object.keys(state.theme).map((key) => (
            <div
              className={
                // `t-badge`
                styles.card
              }
              style={{
                backgroundColor: state.theme[key]
              }}
            >
              <SassVariable
                name={`theme-color-${key}`}
                color={state.theme[key]}
              />
            </div>
          ))}
        </div>
      </section>
      {baseColors.map((baseColor) => (
        <section>
          <h2>{baseColor[0].toUpperCase() + baseColor.slice(1)}</h2>
          <div
            className={styles.colorList}
          >
            {grades.map((grade) => (
              <div
                className={
                  // `t-badge`
                  styles.card
                }
                style={{
                  backgroundColor: state.allColors[baseColor]
                    ? state.allColors[baseColor][grade]
                    : undefined,
                }}
              >
                <SassVariable
                  name={`${baseColor}-${grade}`}
                  color={
                    state.allColors[baseColor]
                      ? state.allColors[baseColor][grade]
                      : ''
                      // Empty on server-side render
                      // console.log(baseColor, 'has no color') || 
                  }
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
    // <Layout>
    //   <main>
    //   </main>
    // </Layout>
  )
}
