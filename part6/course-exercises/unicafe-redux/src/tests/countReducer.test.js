import deepFreeze from "deep-freeze";
import countReducer from "../reducers/countReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = countReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  describe("Feeback buttons", () => {
    test("good is incremented", () => {
      const action = {
        type: "GOOD",
      };
      const state = initialState;
      deepFreeze(state);

      const newState = countReducer(state, action);
      expect(newState).toEqual({
        good: 1,
        ok: 0,
        bad: 0,
      });
    });

    test("ok is incremented", () => {
      const action = {
        type: "OK",
      };
      const state = initialState;
      deepFreeze(state);

      const newState = countReducer(state, action);
      expect(newState).toEqual({
        good: 0,
        ok: 1,
        bad: 0,
      });
    });

    test("bad is incremented", () => {
      const action = {
        type: "BAD",
      };
      const state = initialState;
      deepFreeze(state);

      const newState = countReducer(state, action);
      expect(newState).toEqual({
        good: 0,
        ok: 0,
        bad: 1,
      });
    });
  });
});
