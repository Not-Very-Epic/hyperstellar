/**
 * An object in space with no known properties.
 */
class SimpleCelestialBody {
	#name: string
	#discDate: Date

	/**
	 * It is recommended to use the builder class instead of the constructor.
	 * @param name Name of the body
	 * @param discDate Discovery date of the body
	 */
	constructor(name: string, discDate: Date) {
		this.#name = name
		this.#discDate = discDate
	}

	/**
	 * Name of the body.
	 */
	get name(): string {
		return this.#name
	}

	/**
	 * Discovery date of the body.
	 */
	get discDate(): Date {
		return this.#discDate
	}
}

/**
 * An object in space with known physical properties.
 */
class CelestialBody extends SimpleCelestialBody {
	#mass
	#radius

	/**
	 * It is recommended to use the builder class instead of the constructor.
	 * @param name Name of the body
	 * @param discDate Discovery date of the body
	 * @param mass Mass of the body in kilograms
	 * @param radius Radius of the body in kilometers
	 */
	constructor(name: string, discDate: Date, mass: number, radius: number) {
		super(name, discDate)

		this.#mass = mass
		this.#radius = radius
	}

	/**
	 * Mass of the body in kilograms.
	 */
	get mass(): number {
		return this.#mass
	}

	/**
	 * Radius of the body in kilometers.
	 */
	get radius(): number {
		return this.#radius
	}

	/**
	 * Volume of the body in cubic kilometers.
	 * Calculated from the radius and assumes a perfect sphere.
	 */
	get volume(): number {
		return (4 / 3) * Math.PI * Math.pow(this.radius, 3)
	}

	/**
	 * Density of the body in g/cm3.
	 * Calculated from the mass and volume.
	 */
	get density(): number {
		return this.mass / 1000 / (this.volume * 1e15)
	}
}

namespace Builders {
	export class SimpleCelestialBodyBuilder {
		#name = "Object"
		#discDate = new Date()

		/**
		 * Name of the body.
		 * @returns {SimpleCelestialBodyBuilder} The SimpleCelestialBodyBuilder
		 */
		name(name: string): SimpleCelestialBodyBuilder {
			this.#name = name
			return this
		}

		/**
		 * Discovery date of the body.
		 * @returns {SimpleCelestialBodyBuilder} The SimpleCelestialBodyBuilder
		 */
		discDate(discDate: Date): SimpleCelestialBodyBuilder {
			this.#discDate = discDate
			return this
		}

		/**
		 * Builds a SimpleCelestialBody.
		 * @returns {SimpleCelestialBody} The built SimpleCelestialBody
		 */
		build(): SimpleCelestialBody {
			return new SimpleCelestialBody(this.#name, this.#discDate)
		}
	}

	export class CelestialBodyBuilder {
		#name = "Object"
		#discDate = new Date()
		#mass = 1e10
		#radius = 1000

		/**
		 * Name of the body.
		 * @returns {CelestialBodyBuilder} The CelestialBodyBuilder
		 */
		name(name: string): CelestialBodyBuilder {
			this.#name = name
			return this
		}

		/**
		 * Discovery date of the body.
		 * @returns {CelestialBodyBuilder} The CelestialBodyBuilder
		 */
		discDate(discDate: Date): CelestialBodyBuilder {
			this.#discDate = discDate
			return this
		}

		/**
		 * Mass of the body in kilograms.
		 * @returns {CelestialBodyBuilder} The CelestialBodyBuilder
		 */
		mass(mass: number): CelestialBodyBuilder {
			this.#mass = mass
			return this
		}

		/**
		 * Radius of the body in kilometers.
		 * @returns {CelestialBodyBuilder} The CelestialBodyBuilder
		 */
		radius(radius: number): CelestialBodyBuilder {
			this.#radius = radius
			return this
		}

		/**
		 * Volume of the body in cubic kilometers, assuming a perfect sphere.
		 * If you know the radius, use radius() instead. Do not use both.
		 * @returns {CelestialBodyBuilder} The CelestialBodyBuilder
		 */
		volume(volume: number): CelestialBodyBuilder {
			this.#radius = Math.cbrt((3 / (4 * Math.PI)) * volume)
			return this
		}

		/**
		 * Builds a CelestialBody.
		 * @returns {CelestialBody} The built CelestialBody
		 */
		build(): CelestialBody {
			return new CelestialBody(
				this.#name,
				this.#discDate,
				this.#mass,
				this.#radius
			)
		}
	}
}

export { SimpleCelestialBody, CelestialBody, Builders }
