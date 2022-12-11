const db = [1, 2, 3, 4, 5];

function getAllFoo() {
    const fooValues = { ...db };
    return fooValues;
}

export { getAllFoo };
