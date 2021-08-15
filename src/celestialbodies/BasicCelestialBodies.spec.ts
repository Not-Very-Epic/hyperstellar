import { Builders } from "./BasicCelestialBodies"

describe("CelestialObject tests", () => {
	it("ensure volume is calculated correctly", async () => {
		const testObject = new Builders.CelestialBodyBuilder()
			.name("Test")
			.discDate(new Date())
			.mass(1)
			.radius(1)
			.build()
		expect(testObject.volume).toEqual(4.1887902047863905)
		// 0.6203504908994
	})
})
