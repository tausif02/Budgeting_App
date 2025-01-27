document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.querySelector("#calculateBtn");
    const incomeInput = document.querySelector("#income");
    const expensesInput = document.querySelector("#expenses");
    const savingsInput = document.querySelector("#savings");
    const rentAmountOutput = document.querySelector("#rentAmount");
    const housePriceOutput = document.querySelector("#housePrice");
    const errorMessage = document.querySelector("#errorMessage");
    const tableBody = document.querySelector("#mortgageTable tbody");

    function computeRent() {
        let income = parseFloat(incomeInput.value) || 0;
        let expenses = parseFloat(expensesInput.value) || 0;
        let savings = parseFloat(savingsInput.value) || 0;

        // Clear error message
        errorMessage.textContent = "";
        incomeInput.style.backgroundColor = "";
        expensesInput.style.backgroundColor = "";
        savingsInput.style.backgroundColor = "";

        // Validation: Ensure positive numbers
        if (income <= 0 || expenses < 0 || savings < 0) {
            errorMessage.textContent = "Please enter valid positive numbers.";
            if (income <= 0) incomeInput.style.backgroundColor = "pink";
            if (expenses < 0) expensesInput.style.backgroundColor = "pink";
            if (savings < 0) savingsInput.style.backgroundColor = "pink";
            return;
        }

        // Calculate available rent
        const availableForRent = income - expenses - savings;
        rentAmountOutput.textContent = `$${availableForRent.toFixed(2)}`;

        // Mortgage Calculation
        const r = 0.05 / 12; // Monthly interest rate (5%)
        const n = 30 * 12; // 30-year loan
        const maxHousePrice = (availableForRent * (1 - Math.pow(1 + r, -n))) / r * 1.25;

        housePriceOutput.textContent = `$${maxHousePrice.toFixed(2)}`;

        // Generate Mortgage Table
        generateMortgageTable(availableForRent);
    }

    function generateMortgageTable(availableForRent) {
        tableBody.innerHTML = ""; // Clear table before updating

        const interestRates = [3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5]; // Interest rate variations
        const downPayments = [10, 15, 20, 25, 30, 35, 40]; // Different down payment percentages

        downPayments.forEach(down => {
            let row = document.createElement("tr");
            let downCell = document.createElement("td");
            downCell.innerHTML = `${down}% Down`;
            row.appendChild(downCell);

            interestRates.forEach(rate => {
                let rateCell = document.createElement("td");
                let monthlyRate = (rate / 100) / 12;
                let numPayments = 30 * 12;
                let housePrice = (availableForRent * (1 - Math.pow(1 + monthlyRate, -numPayments))) / monthlyRate * (1 + down / 100);
                rateCell.innerHTML = `$${housePrice.toFixed(2)}`;
                row.appendChild(rateCell);
            });

            tableBody.appendChild(row);
        });
    }

    function fetchCatImage() {
        fetch("https://cataas.com/cat?json=true")
            .then(response => response.json())
            .then(data => {
                if (data && data._id) {
                    document.getElementById("catImage").src = `https://cataas.com/cat/${data._id}`;
                }
            })
            .catch(error => console.error("Cat API Error:", error));
    }

    calculateBtn.addEventListener("click", computeRent);
    fetchCatImage(); // Load a random cat when the page loads
});
