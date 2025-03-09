import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    back: jest.fn(),
  })),
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    const { src, alt } = props;
    return React.createElement("img", { src, alt });
  },
}));

afterEach(() => {
  jest.restoreAllMocks();
});
