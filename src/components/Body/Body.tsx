import Home from "../Home/Home";
import AboutMe from "../AboutMe/AboutMe";
import Videos from "../Videos/Videos";
import Articles from "../Articles/Articles";

interface BodyProps {
  selectedPage: string;
}

export default function Body(props: BodyProps) {
  return (
    <div className="container mt-4">
      {props.selectedPage === 'Home' && <Home />}
      {props.selectedPage === 'About Me' && <AboutMe />}
      {props.selectedPage === 'Videos' && <Videos />}
      {props.selectedPage === 'Articles' && <Articles />}
    </div>
  );
}
