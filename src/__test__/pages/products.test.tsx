import ProductsPage from "@/pages/products";
import { render, screen } from "@testing-library/react";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        route: "/products",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
        isReady: true,
      };
    },
  };
});

describe("Products Page", () => {
  it("should render Products Page", () => {
    const page = render(<ProductsPage />);
    expect(page).toMatchSnapshot();
  });
});
