export default function firstToUpper (value) {
    const result = value[0].toUpperCase() + value.slice(1)
    return result
}