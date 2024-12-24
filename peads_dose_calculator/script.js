let originalCuffed, originalUncuffed;

document.getElementById('medForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = parseFloat(document.getElementById('age').value);
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
        "Glyco : 0.01": 0.01,
        "Neo : 0.05": 0.05
    };

    let resultsHTML = `<h2>Dosage Calculation for ${name}</h2>`;

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
    originalCuffed = ((age / 4) + 3.5).toFixed(4); // Save original cuffed
    originalUncuffed = ((age / 3) + 3.75).toFixed(4); // Save original uncuffed

    resultsHTML += `<p id="cuffed"><b>Cuffed:</b> ${originalCuffed} mm</p>`;
    resultsHTML += `<p id="uncuffed"><b>Uncuffed:</b> ${originalUncuffed} mm</p>`;

    document.getElementById('results').innerHTML = resultsHTML;

    // Show rounding buttons
    document.getElementById('rounding-buttons').style.display = 'block';
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

document.getElementById('roundToPointFive').addEventListener('click', function() {
    updateTubeSize(originalCuffed, originalUncuffed, 0.5);
});

document.getElementById('roundToPointOne').addEventListener('click', function() {
    updateTubeSize(originalCuffed, originalUncuffed, 0.1);
});

function updateTubeSize(cuffed, uncuffed, roundTo) {
    const cuffedElement = document.getElementById('cuffed');
    const uncuffedElement = document.getElementById('uncuffed');

    const roundedCuffed = (Math.round(cuffed / roundTo) * roundTo).toFixed(1); // Round to specified value
    const roundedUncuffed = (Math.round(uncuffed / roundTo) * roundTo).toFixed(1);

    cuffedElement.innerHTML = `<b>Cuffed:</b> ${roundedCuffed} mm`;
    uncuffedElement.innerHTML = `<b>Uncuffed:</b> ${roundedUncuffed} mm`;
}

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
