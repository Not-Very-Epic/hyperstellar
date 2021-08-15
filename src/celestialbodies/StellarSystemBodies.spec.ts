/* eslint-disable @typescript-eslint/no-unused-vars */
import AstronomicalConstants from "../constants/AstronomicalConstants"
import Gas from "../constants/Gas"
import { Star, Builders } from "./StellarSystemBodies"

describe("Star tests", () => {
	const sun = new Star(
		"Sol",
		new Date(-450, 1, 1), // Anaxagoras discovers that the Sun is a star close-up
		AstronomicalConstants.solMass,
		AstronomicalConstants.solRadius,
		AstronomicalConstants.solTemperature
	)
	const siriusA = new Star(
		"Sirius A",
		new Date(1844, 1, 1), // Friedrich Bessel discovers that Sirius is a binary system
		2.063 * AstronomicalConstants.solMass,
		1.711 * AstronomicalConstants.solRadius,
		9940
	)

	it("ensure Star can calculate luminosity correctly", async () => {
		expect(sun.luminosity).toEqual(1)
		expect(siriusA.luminosity).toEqual(25.747808298026616)
	})

	it("ensure Planet can correctly throw an error if atmosphere composition is invalid", async () => {
		let testPlanet = new Builders.PlanetBuilder()
			.atmosComp([
				{ gas: Gas.H2, percentage: 0.5 },
				{ gas: Gas.He, percentage: 0.5 },
			])
			.build()

		try {
			testPlanet = new Builders.PlanetBuilder()
				.atmosComp([
					{ gas: Gas.H2, percentage: 0.5 },
					{ gas: Gas.He, percentage: 0.6 }, // totals to 1.1
				])
				.build()
			throw new Error("failed to catch invalid atmosphere composition")
		} catch (e) {
			if (!(e instanceof RangeError)) {
				throw new Error(
					"failed to catch invalid atmosphere composition"
				)
			}
		}

		try {
			testPlanet = new Builders.PlanetBuilder()
				.atmosComp([
					{ gas: Gas.H2, percentage: 0.5 },
					{ gas: Gas.He, percentage: 0.4 }, // totals to 0.9
				])
				.build()
			throw new Error("failed to catch invalid atmosphere composition")
		} catch (e) {
			if (!(e instanceof RangeError)) {
				throw new Error(
					"failed to catch invalid atmosphere composition"
				)
			}
		}
	})

	it("ensure Planet can calculate temperature correctly", () => {
		const testPlanet = new Builders.PlanetBuilder()
			.parentBody(sun)
			.greenhouseEffect(33)
			.semiMajorAxis(1.49e11)
			.build()
		expect(testPlanet.effectiveTemperature).toEqual(254.54786556712313)
		expect(testPlanet.temperature).toEqual(287.54786556712315)
	})
})
