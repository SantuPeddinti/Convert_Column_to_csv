// Externalized JavaScript from updated_csv.html

function convertData() {
    const inputArea = document.getElementById('userInput');
    // Split by newline, filter out empty lines, handle potential Windows \r
    const lines = inputArea.value.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    
    let singleQuotedCsvData = [];
    let simpleCsvData = []; 

    for (const data of lines) {
        // 1. Single quoted CSV format: escape single quotes with double single quotes and wrap in single quotes
        let singleQuotedCsvValue = "'" + data.replace(/'/g, "''") + "'";
        singleQuotedCsvData.push(singleQuotedCsvValue);

        // 2. Standard CSV (RFC 4180 style): wrap in double quotes if it contains commas, newlines, or double quotes. Escape double quotes with another double quote.
        let simpleCsvValue = data;
        // Check if quoting is necessary for standard CSV compliance
        if (data.includes(',') || data.includes('"') || data.includes('\n') || data.includes('\r')) {
            // Escape double quotes by doubling them
            simpleCsvValue = '"' + data.replace(/"/g, '""') + '"';
        }
        simpleCsvData.push(simpleCsvValue);
    }

    // Join items with a comma (no space) on a single line
    document.getElementById('singleQuotedCsvOutput').textContent = singleQuotedCsvData.join(',');
    document.getElementById('commaSeparatedOutput').textContent = simpleCsvData.join(',');
}

function clearInput() {
    // Clear all fields for a clean slate
    document.getElementById('userInput').value = '';
    document.getElementById('singleQuotedCsvOutput').textContent = '';
    document.getElementById('commaSeparatedOutput').textContent = '';
}

function copyOutput(elementId) {
    const outputBox = document.getElementById(elementId);
    const textToCopy = outputBox.textContent;

    if (textToCopy.trim() === '') {
        alert('No output to copy!');
        return;
    }

    // Use the modern Clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert(`Copied ${elementId.includes('single') ? 'Single Quoted CSV' : 'Standard CSV'} output to clipboard!`);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Failed to copy text. Please select the text manually and copy.');
    });
}
