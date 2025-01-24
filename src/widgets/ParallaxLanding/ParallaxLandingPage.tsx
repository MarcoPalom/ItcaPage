// ScrollPage.tsx
import React, { useCallback } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {ScrollPageProps} from "@/widgets/ParallaxLanding/Interfaces"

import {
  ScrollContainer,
  HorizontalSection,
  gellyAnimation,
  parallaxAnimation,
  useGlobalState
} from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";



const ScrollPage: React.FC<ScrollPageProps> = ({ title, content, images }) => {
  const [scroller] = useGlobalState("container");

  const addGellyAnimation = useCallback(
    (containerAnimation: gsap.core.Tween) => {
      const items = document.querySelectorAll(
        ".ns-horizontal-section__item__inner"
      ) as NodeListOf<HTMLDivElement>;

      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          containerAnimation,
          start: "left right",
          end: "right left",
          scrub: 0.5,
          immediateRender: false,
          onUpdate: () => {
            const velocity = containerAnimation.scrollTrigger?.getVelocity();
            if (velocity && item)
              gellyAnimation(
                item,
                velocity,
                "skewX",
                150,
                -20,
                20,
                0.8,
                "power3"
              );
          }
        });
      });
    },
    []
  );

  const addParallaxAnimation = useCallback(
    (containerAnimation: gsap.core.Tween) => {
      const items = document.querySelectorAll(
        ".ns-horizontal-section__item__fig"
      ) as NodeListOf<HTMLDivElement>;

      items.forEach((trigger) => {
        const el = trigger.querySelector("img");
        if (el && scroller) {
          parallaxAnimation(
            el,
            trigger,
            scroller,
            "right left",
            "left right",
            "x",
            -30,
            30,
            containerAnimation
          );
        }
      });
    },
    [scroller]
  );

  return (
    <ScrollContainer>
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>{title}</h1>
      </section>
      <HorizontalSection addAnimation={addGellyAnimation}>
        {content.map((text, index) => (
          <div key={index} className="ns-horizontal-section__item">
            <div className="ns-horizontal-section__item__inner">{text}</div>
          </div>
        ))}
      </HorizontalSection>
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>{title} - Section 2</h1>
      </section>
      <HorizontalSection toRight={false} addAnimation={addParallaxAnimation}>
        {images.map((src, index) => (
          <div key={index} className="ns-horizontal-section__item">
            <figure
              style={{
                height: "400px",
                width: "300px",
                minWidth: "300px",
                overflow: "hidden",
                margin: "0"
              }}
              className="ns-horizontal-section__item__fig"
            >
              <img
                style={{
                  transform: "scale(1.2)",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
                src={src}
                alt={`Image ${index}`}
              />
            </figure>
          </div>
        ))}
      </HorizontalSection>
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1>{title} - Section 3</h1>
      </section>
    </ScrollContainer>
  );
};

export default ScrollPage;
