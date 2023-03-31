export { modulo };

// Like %, but always returns a positive result.
function modulo(x: number, n: number): number {
    while (x < 0) {
        x += n;
    }
    return x % n;
}
