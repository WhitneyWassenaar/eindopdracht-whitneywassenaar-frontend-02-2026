function calculateAge(birthDate) {

    if (!birthDate) {
        return "Onbekend";
    }

    const today = new Date();
    const birth = new Date(birthDate);

    const minimumYear = 1900;

    if (
        birth.getFullYear() < minimumYear ||
        birth > today
    ) {
        return "Onbekend";
    }

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (
        month < 0 ||
        (month === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return  age >= 0 ? age : "Onbekend";
}

export default calculateAge;