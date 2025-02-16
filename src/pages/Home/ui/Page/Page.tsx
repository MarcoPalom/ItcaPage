import { FC } from "react";
import ScrollPage from "@/widgets/ParallaxLanding/ParallaxLandingPage";
import {
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
} from "@/widgets/ParallaxLanding/Content"


const Home: FC = () => {
  return (
    <>
      <ScrollPage
        title="Welcome to the Scroll Page"
        content={content}
        images={images}
        backgroundImage={backgroundImage}
        ComponentB= {ComponentB}
        ComponentM= {ComponentM}
        ComponentL= {ComponentL}
        ComponentV= {ComponentV}
        ComponentSL= {ComponentSL}
        ComponentM1= {ComponentM1}
        ComponentM2= {ComponentM2}
        ComponentM3= {ComponentM3}
      />
      <section>
        <div className="hero min-h-[calc(100vh-64px)] bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="/images/hero.webp"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Welcome</h1>
              <p className="py-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
                minima laboriosam maxime sed dignissimos harum provident itaque
                fugiat. A repellat aliquid inventore dolor tempora, omnis
                perferendis aspernatur quo nisi excepturi. Ex, ullam odio iusto
                esse necessitatibus doloremque repudiandae!
              </p>
              <button className="btn-primary btn">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
