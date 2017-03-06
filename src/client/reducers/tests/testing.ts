import { helloString } from "../testHello";
import { expect } from "chai"

describe("Hello string function", () => {
    it("should return hello", () => {
        const result = helloString();
        expect(result).to.equal("Hello");
    })
})