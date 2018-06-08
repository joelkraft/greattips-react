import reducer from "./tips";
import * as actions from "../actiontypes/tips";

describe("tips reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({ items: [] });
    });
});
