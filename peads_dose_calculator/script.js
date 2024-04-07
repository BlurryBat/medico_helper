document.getElementById('medForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!name || !age || !weight) {
        alert('Please fill in all fields.');
        return;
    }

    const medications = {
        "Glyco : 0.005 ": 0.005,
        "Fenta : 1 - 2": {"min": 1, "max": 2},
        "<u>Midaz</u> : 0.025 - 0.1": {"min": 0.025, "max": 0.1},
        "Thio : 5 - 7": {"min": 5, "max": 7},
        "Propofol : 1 - 2": {"min": 1, "max": 2},
        "<u>Ketamine</u> : 1 - 2": {"min": 1, "max": 2},
        "Scoline : 1 - 2": {"min": 1, "max": 2},
        "<u>Cisblock</u> : 0.1": 0.1,
        "PCT : 15 - 20": {"min": 15, "max": 20},
        "Morphine : 0.1": 0.1,
        "<u>Tramadol</u> : 2": 2,
        "Glyco : 0.01":0.01,
        "Neo : 0.05": 0.05
    };

    let resultsHTML = '<h2>Dosage Calculation for ' + name + '</h2>';

    for (const [medication, constant] of Object.entries(medications)) {
        let dosage;
        let unit;
        if (typeof constant === 'object') {
            if (medication.includes("Fenta ")) {
                dosage = calculateDosage(weight, constant.min, constant.max);
                unit = "mcg";
            } else {
                dosage = calculateDosage(weight, constant.min, constant.max);
                unit = "mg";
            }
        } else {
            dosage = (constant * weight).toFixed(4); // Limit decimal places to 4
            unit = "mg";
        }
        resultsHTML += `<p>${medication}: ${dosage} ${unit}</p>`;
    }

    // Calculate cuffed and uncuffed values
    const cuffed = ((age / 4) + 3.5).toFixed(4); // Limit decimal places to 4
    const uncuffed = ((age / 3) + 3.75).toFixed(4); // Limit decimal places to 4
    resultsHTML += `<p><b>Cuffed:</b> ${cuffed} mm</p>`;
    resultsHTML += `<p><b>Uncuffed:</b> ${uncuffed} mm</p>`;

    document.getElementById('results').innerHTML = resultsHTML;
});

document.getElementById('printButton').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const results = document.getElementById('results').innerText;

    const clipboardData = `${name}\nAge: ${age}\nWeight: ${weight} kg\n\n${results}`;

    navigator.clipboard.writeText(clipboardData).then(function() {
        showToast();
    });
});

function calculateDosage(weight, min, max) {
    const lowerLimit = min * weight;
    const upperLimit = max * weight;
    return `${lowerLimit.toFixed(4)} - ${upperLimit.toFixed(4)}`;
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.textContent = 'Copied to clipboard!';
    toast.classList.add('show');
    setTimeout(function() {
        toast.classList.remove('show');
    }, 3000);
}




