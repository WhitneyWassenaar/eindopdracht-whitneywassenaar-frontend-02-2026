function generateId(items) {
    if (items === 0) {
        return 1;
    }

    return Math.max(...items.map(items => items.id)) + 1
}

export default generateId;