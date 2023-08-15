export const parseStringToBoolean = (input) => {
    if (typeof input === "boolean") return input;

    if (input === "true" || input === "false") {
        return JSON.parse(input);
    } else {
        throw new Error("Value other than 'true' or 'false' entered.")
    }
};