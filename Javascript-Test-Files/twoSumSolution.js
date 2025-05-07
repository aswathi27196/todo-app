function twoSum(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("Input must be an array.");
    }
    if (typeof target !== "number") {
        throw new Error("Target must be a number.");
    }

    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }

        seen.set(num, i);
    }

    throw new Error("No two sum solution found.");
}

function runTwoSum() {
    const input = document.getElementById("nums").value;
    const targetInput = document.getElementById("target").value;
    const outputDiv = document.getElementById("output");

    try {
        const nums = input.split(",").map(n => parseInt(n.trim()));
        const target = parseInt(targetInput);

        if (nums.some(isNaN)) throw new Error("Invalid numbers in array.");
        if (isNaN(target)) throw new Error("Invalid target.");

        const result = twoSum(nums, target);
        outputDiv.innerText = `Indices: [${result[0]}, ${result[1]}]`;
    } catch (err) {
        outputDiv.innerText = "Error: " + err.message;
    }
}
