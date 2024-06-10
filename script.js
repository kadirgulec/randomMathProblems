const { jsPDF } = window.jspdf;
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblems() {
    const operations = Array.from(document.getElementById('operations').selectedOptions).map(option => option.value);
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const count = parseInt(document.getElementById('count').value);

    if (operations.length === 0) {
        alert('Please select at least one operation.');
        return;
    }

    if (count <= 0) {
        alert('Please enter a valid number of problems.');
        return;
    }

    let problems = '';

    for (let i = 0; i < count; i++) {
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, problem = '';

        switch (operation) {
            case 'add':
                num1 = generateRandomNumber(min, max);
                num2 = generateRandomNumber(min, max);
                problem = `${num1} + ${num2}`;
                break;
            case 'subtract':
                num1 = generateRandomNumber(min, max);
                num2 = generateRandomNumber(min, max);
                if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure num1 >= num2
                problem = `${num1} - ${num2}`;
                break;
            case 'multiply':
                num1 = generateRandomNumber(min, max);
                num2 = generateRandomNumber(min, max);
                problem = `${num1} x ${num2}`;
                break;
            case 'divide':
                num2 = generateRandomNumber(min, max);
                const result = generateRandomNumber(min, max);
                num1 = num2 * result; // Ensure num1 / num2 is an integer
                problem = `${num1} ÷ ${num2}`;
                break;
        }

        problems += `<div>${problem}= _______</div>`;
    }
    document.getElementById('fixed').classList.add("fixed-buttons")
    document.getElementById('problems').innerHTML = problems;
}

function downloadPDF() {
    const doc = new jsPDF();
    const problems = document.getElementById('problems').innerText.split('\n');

    problems.forEach((problem, index) => {
        if (index > 27){
            doc.text(problem, 120, 10 +((index - 28) * 10));
            return;
        }
        doc.text(problem, 10, 10 + (index * 10));
        
    });

    doc.save('math-problems.pdf');
}
