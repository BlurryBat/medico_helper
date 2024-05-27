document.getElementById('admissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fields = [
        { id: 'name', label: 'Name' },
        { id: 'age', label: 'Age' },
        { id: 'gender', label: 'Gender' },
        { id: 'height', label: 'Height (cm)' },
        { id: 'weight', label: 'Weight (kg)' },
        { id: 'date', label: 'Date' },
        { id: 'reason', label: 'Diagnosis and proposed surgery' },
        { id: 'pulse', label: 'Pulse' },
        { id: 'bp', label: 'BP' },
        { id: 'history', label: 'History' },
        { id: 'smoking', label: 'Smoking' },
        { id: 'alcohol', label: 'Alcohol' },
        { id: 'pastAnestheticHistory', label: 'Past Anesthetic History' },
        { id: 'mp', label: 'MP' },
        { id: 'iid', label: 'IID' },
        { id: 'tmj', label: 'TMJ' },
        { id: 'tmd', label: 'TMD' },
        { id: 'neck', label: 'Neck' },
        { id: 'spine', label: 'Spine' },
        { id: 'other', label: 'Other' },
    ];

    let outputText = '';

    fields.forEach(field => {
        const value = document.getElementById(field.id).value;
        if (value) {
            outputText += `<p><strong>${field.label}:</strong> ${value}</p>`;
        }
    });

    const outputDiv = document.getElementById('output');
    const submittedDetailsDiv = document.getElementById('submittedDetails');
    submittedDetailsDiv.innerHTML = `<h3>PAC</h3>${outputText}`;
    outputDiv.style.display = 'block';
});

document.getElementById('copyButton').addEventListener('click', function() {
    const outputDiv = document.getElementById('submittedDetails');
    const textToCopy = outputDiv.innerText;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    alert('Text copied to clipboard!');
});
