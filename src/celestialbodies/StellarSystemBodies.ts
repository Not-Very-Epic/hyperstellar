import AstronomicalConstants from "../constants/AstronomicalConstants"
import Gas from "../constants/Gas"
import { CelestialBody, SimpleCelestialBody } from "./BasicCelestialBodies"

// XXX pretty much this entire file

/**
 * A star with known physical properties.
 */
class Star extends CelestialBody {
	#temperature: number

	constructor(
		name: string,
		discDate: Date,
		mass: number,
		radius: number,
		temperature: number
	) {
		super(name, discDate, mass, radius)

		this.#temperature = temperature
	}

	/**
	 * The temperature of the body in kelvin.
	 */
	get temperature(): number {
		return this.#temperature
	}

	/**
	 * The luminosity of the body relative to the Sun.
	 */
	get luminosity(): number {
		return (
			Math.pow(this.radius / AstronomicalConstants.solRadius, 2) *
			Math.pow(this.temperature / AstronomicalConstants.solTemperature, 4)
		)
	}
}

/**
 * A planet with known physical, atmospheric, and orbital properties.
 */
class Planet extends CelestialBody {
	#surfacePressure: number
	#greenhouseEffect: number
	#atmosComp: { gas: Gas; percentage: number }[]
	#parentBody: SimpleCelestialBody
	#semiMajorAxis: number

	constructor(
		name: string,
		discDate: Date,
		mass: number,
		radius: number,
		surfacePressure: number,
		greenhouseEffect: number,
		atmosComp: { gas: Gas; percentage: number }[],
		parentBody: SimpleCelestialBody,
		semiMajorAxis: number
	) {
		super(name, discDate, mass, radius)

		this.#surfacePressure = surfacePressure
		this.#greenhouseEffect = greenhouseEffect
		if (this.#isValidComposition(atmosComp)) {
			this.#atmosComp = atmosComp
		} else {
			throw new RangeError(
				"total gas percentage cannot be less or more than 1"
			)
		}
		this.#parentBody = parentBody
		this.#semiMajorAxis = semiMajorAxis
	}

	get effectiveTemperature(): number {
		if (this.parentBody instanceof Star) {
			return Math.pow(
				(this.parentBody.luminosity *
					AstronomicalConstants.solLuminosity *
					0.694) / // TODO add support for custom albedos
					(16 *
						Math.PI *
						Math.pow(this.#semiMajorAxis, 2) *
						AstronomicalConstants.stefanBoltzmann),
				1 / 4
			)
		} else {
			return 0
		}
	}

	get temperature(): number {
		return this.effectiveTemperature + this.greenhouseEffect
	}

	/**
	 * Surface pressure of the body in bars.
	 */
	get surfacePressure(): number {
		return this.#surfacePressure
	}

	/**
	 * Greenhouse effect of the body in degrees celsius.
	 */
	get greenhouseEffect(): number {
		return this.#greenhouseEffect
	}

	/**
	 * Atmosphere composition of the body.
	 */
	get atmosComp(): { gas: Gas; percentage: number }[] {
		return this.#atmosComp
	}

	/**
	 * The body's orbital parent.
	 */
	get parentBody(): SimpleCelestialBody {
		return this.#parentBody
	}

	/**
	 * Semi-major axis of the body in km.
	 */
	get semiMajorAxis(): number {
		return this.#semiMajorAxis
	}

	#isValidComposition(
		atmosComp: { gas: Gas; percentage: number }[]
	): boolean {
		let i = 0
		for (let j = 0; j < atmosComp.length; j++) {
			i += atmosComp[j].percentage
		}
		if (i === 1) {
			return true
		} else {
			return false
		}
	}
}

namespace Builders {
	export class StarBuilder {
		#name = "Object"
		#discDate = new Date()
		#mass = 1e20
		#radius = 100000
		#temperature = 2000

		/**
		 * Name of the body.
		 * @returns {StarBuilder} The StarBuilder
		 */
		name(name: string): StarBuilder {
			this.#name = name
			return this
		}

		/**
		 * Discovery date of the body.
		 * @returns {StarBuilder} The StarBuilder
		 */
		discDate(discDate: Date): StarBuilder {
			this.#discDate = discDate
			return this
		}

		/**
		 * Mass of the body in kilograms.
		 * @returns {StarBuilder} The StarBuilder
		 */
		mass(mass: number): StarBuilder {
			this.#mass = mass
			return this
		}

		/**
		 * Radius of the body in kilometers.
		 * @returns {StarBuilder} The StarBuilder
		 */
		radius(radius: number): StarBuilder {
			this.#radius = radius
			return this
		}

		/**
		 * Volume of the body in cubic kilometers, assuming a perfect sphere.
		 * If you know the radius, use radius() instead. Do not use both.
		 * @returns {StarBuilder} The StarBuilder
		 */
		volume(volume: number): StarBuilder {
			this.#radius = Math.cbrt((3 / (4 * Math.PI)) * volume)
			return this
		}

		/**
		 * Temperature of the body in kelvin.
		 * @returns {StarBuilder} The StarBuilder
		 */
		temperature(temperature: number): StarBuilder {
			this.#temperature = temperature
			return this
		}

		/**
		 * Builds a Star.
		 * @returns {Star} The built Star
		 */
		build(): Star {
			return new Star(
				this.#name,
				this.#discDate,
				this.#mass,
				this.#radius,
				this.#temperature
			)
		}
	}

	export class PlanetBuilder {
		#name = "Object"
		#discDate = new Date()
		#mass = 1e20
		#radius = 100000
		#surfacePressure = 100
		#greenhouseEffect = 1
		#atmosComp = [{ gas: Gas.H2, percentage: 1 }]
		#parentBody = new SimpleCelestialBody("PLACEHOLDER", new Date())
		#semiMajorAxis = 1e5

		/**
		 * Name of the body.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		name(name: string): PlanetBuilder {
			this.#name = name
			return this
		}

		/**
		 * Discovery date of the body.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		discDate(discDate: Date): PlanetBuilder {
			this.#discDate = discDate
			return this
		}

		/**
		 * Mass of the body in kilograms.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		mass(mass: number): PlanetBuilder {
			this.#mass = mass
			return this
		}

		/**
		 * Radius of the body in kilometers.
		 * @returns {StarBuilder} The PlanetBuilder
		 */
		radius(radius: number): PlanetBuilder {
			this.#radius = radius
			return this
		}

		/**
		 * Volume of the body in cubic kilometers, assuming a perfect sphere.
		 * If you know the radius, use radius() instead. Do not use both.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		volume(volume: number): PlanetBuilder {
			this.#radius = Math.cbrt((3 / (4 * Math.PI)) * volume)
			return this
		}

		/**
		 * Surface pressure of the body in bars.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		surfacePressure(surfacePressure: number): PlanetBuilder {
			this.#surfacePressure = surfacePressure
			return this
		}

		/**
		 * Greenhouse effect of the body in bars.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		greenhouseEffect(greenhouseEffect: number): PlanetBuilder {
			this.#greenhouseEffect = greenhouseEffect
			return this
		}

		/**
		 * Composition of the planet's atmosphere.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		atmosComp(
			atmosComp: { gas: Gas; percentage: number }[]
		): PlanetBuilder {
			this.#atmosComp = atmosComp
			return this
		}

		/**
		 * The body's orbital parent.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		parentBody(parentBody: SimpleCelestialBody): PlanetBuilder {
			this.#parentBody = parentBody
			return this
		}

		/**
		 * Semi-major axis of the body in km.
		 * @returns {PlanetBuilder} The PlanetBuilder
		 */
		semiMajorAxis(semiMajorAxis: number): PlanetBuilder {
			this.#semiMajorAxis = semiMajorAxis
			return this
		}

		/**
		 * Builds a Planet.
		 * @returns {Planet} The built Planet
		 */
		build(): Planet {
			return new Planet(
				this.#name,
				this.#discDate,
				this.#mass,
				this.#radius,
				this.#surfacePressure,
				this.#greenhouseEffect,
				this.#atmosComp,
				this.#parentBody,
				this.#semiMajorAxis
			)
		}
	}
}

export { Star, Planet, Builders }
