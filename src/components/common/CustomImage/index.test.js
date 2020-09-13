import React from "react"
import CustomImage from "./index.js"

import { render, cleanup, fireEvent, configure } from "@testing-library/react"

configure({
  testIdAttribute: "data-test-id",
})

describe("blank src", () => {
  afterEach(cleanup)

  it("renders components with props", () => {
    const { queryByTestId } = render(<CustomImage />)

    const component = queryByTestId("custom-image")

    expect(component).toBeTruthy()
  })
})

describe("src without query", () => {
  afterEach(cleanup)

  it("renders component with props", () => {
    const { queryByTestId } = render(<CustomImage src="https://example.com" />)

    const component = queryByTestId("custom-image")

    expect(component).toBeTruthy()
    expect(component.src).toEqual("https://example.com/?dpr=1")
    expect(component.srcset).toContain("https://example.com?dpr=1&w=576 576w")
    expect(component.srcset).toContain("https://example.com?dpr=1&w=992 992w")
    expect(component.sizes).toEqual("100vw")
  })
})

describe("src with query", () => {
  afterEach(cleanup)

  it("renders component with props", () => {
    const { queryByTestId } = render(
      <CustomImage src="https://example.com?fm=png" />
    )

    const component = queryByTestId("custom-image")

    expect(component).toBeTruthy()
    expect(component.src).toEqual("https://example.com/?dpr=1&fm=png")
    expect(component.srcset).toContain(
      "https://example.com?dpr=1&fm=png&w=576 576w"
    )
    expect(component.srcset).toContain(
      "https://example.com?dpr=1&fm=png&w=992 992w"
    )
    expect(component.sizes).toEqual("100vw")
  })
})
