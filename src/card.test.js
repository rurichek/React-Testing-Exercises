import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";
import TEST_IMAGES from "./_testCommon.js";

// smoke test
it("renders without crashing", function() {
    render(<Card />);
  });

//   snapshot test
it("matches snapshot", function() {
    const firstImage = TEST_IMAGES[0];
    const { asFragment } = render(<Card
        caption={firstImage.caption} 
        src={firstImage.src} 
        currNum={1} 
        totalNum={3}
        />);
    expect(asFragment()).toMatchSnapshot();
});
