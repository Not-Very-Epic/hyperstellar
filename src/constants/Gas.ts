/**
 * A painstakingly large list of valid gases or liquid vapours that a planet's atmosphere can contain.
 */
enum Gas {
	/* homonuclear gases */
	H2, // hydrogen
	He, // helium
	N2, // nitrogen
	O2, // oxygen
	O3, // ozone
	F2, // fluorine
	Ne, // neon
	Cl2, // chlorine
	Ar, // argon
	Br2, // bromine
	Kr, // krypton
	Xe, // xenon
	/* heteronuclear gases */
	CH4, // methane
	C2H6, // ethane
	C3H8, // propane
	C4H10, // butane
	C2H4, // ethylene
	C2H2, // acetylene
	NH3, // ammonia
	C2N2, // cyanogen
	HCN, // hydrogen cyanide
	H2O, // water
	CO, // carbon monoxide
	CO2, // carbon dioxide
	CH2O, // formaldehyde
	CH4O, // methanol
	C2H6O, // ethanol
	C3H6O, // acetone
	HF, // hydrogen fluoride
	CF4, // carbon tetrafluoride
	PH3, // phosphine
	H2S, // hydrogen sulfide
	SO2, // sulfur dioxide
	H2SO4, // sulfuric acid
	SF6, // sulfur hexafluoride
	HCl, // hydrogen chloride
	CCl4, // carbon tetrachloride
	CHCl3, // chloroform
	CCl2O, // phosgene
}

export default Gas
