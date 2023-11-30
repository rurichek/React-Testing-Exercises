import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import '@testing-library/jest-dom';


// smoke test: 
  it('renders without crashing', () => {
    render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
  });

// snapshot test: 
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel
      photos={TEST_IMAGES} 
      title="Test Carousel"
      />);
  expect(asFragment()).toMatchSnapshot();
});

// left and right arrow bug
describe('Carousel left arrow bug', () => {
  it('moves to the previous image on left arrow click', () => {
    const { getByTestId, queryByAltText } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);

    const rightArrow = getByTestId('right-arrow');
    fireEvent.click(rightArrow);

    const leftArrow = getByTestId('left-arrow');
    fireEvent.click(leftArrow);

    expect(queryByAltText(TEST_IMAGES[0].caption)).toBeInTheDocument();
    
  });
});

// test to check if the left arrow is missing when you are on the first page
describe('Carousel arrow visibility', () => {
  it('hides the left arrow when on the first image', () => {
    const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    console.log(render)
    const leftArrow = queryByTestId('left-arrow');
    expect(leftArrow).not.toBeInTheDocument();
  });

  it('hides the right arrow when on the last image', () => {
    const { queryByTestId, getByTestId } = render(<Carousel photos={TEST_IMAGES} title="Test Carousel" />);
    // Move to the last image
    for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
      fireEvent.click(getByTestId('right-arrow'));
    }
    const rightArrow = queryByTestId('right-arrow');
    expect(rightArrow).not.toBeInTheDocument();
  });
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
