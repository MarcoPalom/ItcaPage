"use client"

import type React from "react"
import { useCallback, useRef, useEffect } from "react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import gsap from "gsap"
import type { ScrollPageProps } from "@/widgets/ParallaxLanding/Interfaces"
import {
  ScrollContainer,
  HorizontalSection,
  gellyAnimation,
  parallaxAnimation,
  useGlobalState,
} from "react-nice-scroll"
import "react-nice-scroll/dist/styles.css"

gsap.registerPlugin(ScrollTrigger)

const ScrollPage: React.FC<ScrollPageProps> = ({
  title,
  content,
  images,
  backgroundImage,
  ComponentB,
  ComponentM,
  ComponentL,
  ComponentV,
  ComponentSL,
  ComponentM1,
  ComponentM2,
  ComponentM3,
}) => {
  const [scroller] = useGlobalState("container")
  const componentLRef = useRef<HTMLImageElement>(null)
  const componentSLRef = useRef<HTMLImageElement>(null)
  const componentVRef = useRef<HTMLImageElement>(null)
  const componentMRef = useRef<HTMLImageElement>(null)
  const componentBRef = useRef<HTMLImageElement>(null)
  const componentM1Ref = useRef<HTMLImageElement>(null)
  const componentM2Ref = useRef<HTMLImageElement>(null)
  const componentM3Ref = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const addGellyAnimation = useCallback((containerAnimation: gsap.core.Tween) => {
    const items = document.querySelectorAll(".ns-horizontal-section__item__inner") as NodeListOf<HTMLDivElement>

    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        containerAnimation,
        start: "left right",
        end: "right left",
        scrub: 0.5,
        immediateRender: false,
        onUpdate: () => {
          const velocity = containerAnimation.scrollTrigger?.getVelocity()
          if (velocity && item) {
            gellyAnimation(item, velocity, "skewX", 150, -20, 20, 0.8, "power3")
          }
        },
      })
    })
  }, [])

  const addParallaxAnimation = useCallback(
    (containerAnimation: gsap.core.Tween) => {
      const items = document.querySelectorAll(".ns-horizontal-section__item__fig") as NodeListOf<HTMLDivElement>

      items.forEach((trigger) => {
        const el = trigger.querySelector("img")
        if (el && scroller) {
          parallaxAnimation(el, trigger, scroller, "right left", "left right", "x", -30, 30, containerAnimation)
        }
      })
    },
    [scroller],
  )

  useEffect(() => {
    if (
      componentLRef.current &&
      componentSLRef.current &&
      componentVRef.current &&
      componentMRef.current &&
      componentBRef.current &&
      componentM1Ref.current &&
      componentM2Ref.current &&
      componentM3Ref.current &&
      sectionRef.current &&
      scroller
    ) {
      const section = sectionRef.current
      const componentL = componentLRef.current
      const componentSL = componentSLRef.current
      const componentV = componentVRef.current
      const componentM = componentMRef.current
      const componentB = componentBRef.current
      const componentM1 = componentM1Ref.current
      const componentM2 = componentM2Ref.current
      const componentM3 = componentM3Ref.current

      gsap.set([componentL, componentSL, componentV, componentM, componentB, componentM1, componentM2, componentM3], {
        y: 0,
        x: 0,
      })

      const createScrollTrigger = (element: HTMLElement, animationFunction: (progress: number) => void) => {
        return ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scroller: scroller,
          scrub: true,
          onUpdate: (self) => {
            const progress = Math.max(0, self.progress - 0.5)
            animationFunction(progress)
          },
        })
      }

      const stL = createScrollTrigger(componentL, (progress) => {
        const yValue = progress * 140
        gsap.to(componentL, {
          y: `${yValue}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stSL = createScrollTrigger(componentSL, (progress) => {
        const yValue = progress * 240
        gsap.to(componentSL, {
          y: `${yValue}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stV = createScrollTrigger(componentV, (progress) => {
        const yValue = -Math.sin(progress * Math.PI) * 100
        const xValue = progress * 50
        gsap.to(componentV, {
          y: `${yValue}%`,
          x: `${xValue}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stM = createScrollTrigger(componentM, (progress) => {
        const yValue = -Math.sin(progress * Math.PI) * 100
        const xValue = progress * 50
        gsap.to(componentM, {
          y: `${yValue}%`,
          x: `${xValue}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stB = createScrollTrigger(componentB, (progress) => {
        const yValue = -Math.sin(progress * Math.PI) * 100
        const xValue = progress * 50
        gsap.to(componentB, {
          y: `-${yValue}%`,
          x: `-${xValue}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stM1 = createScrollTrigger(componentM1, (progress) => {
        gsap.to(componentM1, {
          y: `${progress * 1450}%`,
          x: "0%",
          duration: 0.1,
          ease: "none",
        })
      })

      const stM2 = createScrollTrigger(componentM2, (progress) => {
        gsap.to(componentM2, {
          y: `${progress * 1450}%`,
          x: `-${progress * 500}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      const stM3 = createScrollTrigger(componentM3, (progress) => {
        gsap.to(componentM3, {
          y: `${progress * 800}%`,
          x: `${progress * 50}%`,
          duration: 0.1,
          ease: "none",
        })
      })

      return () => {
        stL.kill()
        stSL.kill()
        stV.kill()
        stM.kill()
        stB.kill()
        stM1.kill()
        stM2.kill()
        stM3.kill()
      }
    }
  }, [scroller])

  return (
    <ScrollContainer>
      <section
        ref={sectionRef}
        className="relative flex h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="relative w-full h-full">
          <img
            ref={componentBRef}
            className="absolute w-[17.69%] h-[43.7%] left-[28%] top-[17.5%]"
            src={ComponentB || "/placeholder.svg"}
            alt="Component B"
          />
          <img
            ref={componentMRef}
            className="absolute w-[17.39%] h-[24.95%] left-[58.5%] top-[16.5%]"
            src={ComponentM || "/placeholder.svg"}
            alt="Component M"
          />
          <img
            ref={componentSLRef}
            className="component-sl absolute w-[37.02%] h-[9.51%] left-[31.49%] top-[80%]"
            src={ComponentSL || "/placeholder.svg"}
            alt="Component SL"
          />
          <img
            ref={componentLRef}
            className="component-l absolute w-[32.66%] h-[23.25%] left-[32.66%] top-[59.49%]"
            src={ComponentL || "/placeholder.svg"}
            alt="Component L"
          />
          <img
            ref={componentVRef}
            className="absolute w-[17.4%] h-[36.7%] left-[61.8%] top-[39.7%]"
            src={ComponentV || "/placeholder.svg"}
            alt="Component V"
          />
          <img
            ref={componentM1Ref}
            className="absolute w-[5.22%] h-[9.94%] left-[47.5%] top-[21.5%]"
            src={ComponentM1 || "/placeholder.svg"}
            alt="Component M1"
          />
          <img
            ref={componentM2Ref}
            className="absolute w-[3.82%] h-[7.19%] left-[50%] top-[45%]"
            src={ComponentM2 || "/placeholder.svg"}
            alt="Component M2"
          />
          <img
            ref={componentM3Ref}
            className="absolute w-[4.64%] h-[12.26%] left-[57.49%] top-[51%]"
            src={ComponentM3 || "/placeholder.svg"}
            alt="Component M3"
          />
        </div>
      </section>

      <HorizontalSection addAnimation={addGellyAnimation}>
        {content.map((text, index) => (
          <div key={index} className="ns-horizontal-section__item">
            <div className="ns-horizontal-section__item__inner">{text}</div>
          </div>
        ))}
      </HorizontalSection>

      <section className="h-screen flex items-center justify-center">
        <h1>{title} - Section 2</h1>
      </section>

      <HorizontalSection toRight={false} addAnimation={addParallaxAnimation}>
        {images.map((src, index) => (
          <div key={index} className="ns-horizontal-section__item">
            <figure className="ns-horizontal-section__item__fig h-[400px] w-[300px] min-w-[300px] overflow-hidden m-0">
              <img
                className="transform scale-110 w-full h-full object-cover"
                src={src || "/placeholder.svg"}
                alt={`Image ${index}`}
              />
            </figure>
          </div>
        ))}
      </HorizontalSection>

      <section className="h-screen flex items-center justify-center">
        <h1>{title} - Section 3</h1>
      </section>
    </ScrollContainer>
  )
}

export default ScrollPage

