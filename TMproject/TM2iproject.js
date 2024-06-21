// Get the form elements
const ItemNameInput = document.getElementById('ItemName');
const DescriptionInput = document.getElementById('Description');
const QtyInput = document.getElementById('Qty');
const RateInput = document.getElementById('Rate');
const DiscountInput = document.getElementById('Discount');
const AmountInput = document.getElementById('Amount');
const addButton = document.getElementById('addButton');
const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
const popupList = document.getElementById('popupList');
const TotalAmountInput = document.getElementById('TotalAmount');

let data = [];

// Fetch data from TM101.json
fetch('TM101.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
    })
    .catch(error => console.error('Error fetching JSON data:', error));

// Event listener for Item Name input for autocomplete functionality
ItemNameInput.addEventListener('input', () => {
    const inputValue = ItemNameInput.value.toLowerCase();
    popupList.innerHTML = '';
    data.forEach(item => {
        if (item.label.toLowerCase().includes(inputValue)) {
            const listItem = document.createElement('div');
            listItem.textContent = item.label;
            listItem.addEventListener('click', () => {
                ItemNameInput.value = item.label;
                DescriptionInput.value = item.description;
                QtyInput.value = item.balance;
                RateInput.value = item.salePrice;
                DiscountInput.value = item.dealerPrice;
                calculateAmount();
                popupList.style.display = 'none';
            });
            popupList.appendChild(listItem);
        }
    });
    if (popupList.children.length > 0) {
        popupList.style.display = 'block';
        popupList.style.top = `${ItemNameInput.offsetTop + ItemNameInput.offsetHeight}px`;
        popupList.style.left = `${ItemNameInput.offsetLeft}px`;
    } else {
        popupList.style.display = 'none';
    }
});

// Hide popup list when clicking outside the Item Name input
document.addEventListener('click', (e) => {
    if (e.target !== ItemNameInput) {
        popupList.style.display = 'none';
    }
});

// Function to calculate amount
function calculateAmount() {
    const qty = parseFloat(QtyInput.value) || 0;
    const rate = parseFloat(RateInput.value) || 0;
    const discount = parseFloat(DiscountInput.value) || 0;
    const amount = (qty * rate) - discount;
    AmountInput.value = amount.toFixed(2);
}

// Add event listeners for quantity, rate, and discount inputs to auto-calculate the amount
QtyInput.addEventListener('input', calculateAmount);
RateInput.addEventListener('input', calculateAmount);
DiscountInput.addEventListener('input', calculateAmount);

// Function to calculate total amount
function calculateTotalAmount() {
    let total = 0;
    const rows = itemTable.rows;
    for (let i = 0; i < rows.length; i++) {
        const amountCell = rows[i].cells[5];
        if (amountCell) {
            const amount = parseFloat(amountCell.textContent) || 0;
            total += amount;
        }
    }
    TotalAmountInput.value = total.toFixed(2);
}

// Function to delete a row
function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
    calculateTotalAmount();
}

// Event listener for Add button to add item to the table
addButton.addEventListener('click', () => {
    const newRow = itemTable.insertRow(-1);
    const cells = [
        newRow.insertCell(0),
        newRow.insertCell(1),
        newRow.insertCell(2),
        newRow.insertCell(3),
        newRow.insertCell(4),
        newRow.insertCell(5),
        newRow.insertCell(6)
    ];
    cells[0].innerHTML = ItemNameInput.value;
    cells[1].innerHTML = DescriptionInput.value;
    cells[2].innerHTML = QtyInput.value;
    cells[3].innerHTML = RateInput.value;
    cells[4].innerHTML = DiscountInput.value;
    cells[5].innerHTML = AmountInput.value;
    cells[6].innerHTML = '<button class="delete-button" onclick="deleteRow(this)">x</button>';

    // Clear form fields
    ItemNameInput.value = '';
    DescriptionInput.value = '';
    QtyInput.value = '';
    RateInput.value = '';
    DiscountInput.value = '';
    AmountInput.value = '';

    // Calculate the total amount
    calculateTotalAmount();
});