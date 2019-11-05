import reducer from "reducers/application";

describe("useApplicationData", () => {
  it("throws an error with an unsupported type", () => {

    // PASS FUNC() TO EXPECT SO IT CAN CATCH THE ERROR THROWN & COMPARE IT
    expect(() => reducer({}, {type:null})).toThrowError(
      "Tried to reduce with an unsupported action type: null"
    )
  })
})