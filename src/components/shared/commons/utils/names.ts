export const formatFirstLetterNames = (name:string) => {
	if (name.includes(" ")) {
		const nameSplitted = name.split(" ");
		return nameSplitted[0].charAt(0).toUpperCase() + nameSplitted[1].charAt(0).toUpperCase();
	}
    
	return name?.charAt(0).toUpperCase();
};