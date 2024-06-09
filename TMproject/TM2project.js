// Updated TM2project.js
const ItemNameInput = document.getElementById('ItemName');
const DescriptionInput = document.getElementById('Description');
const QtyInput = document.getElementById('Qty');
const RateInput = document.getElementById('Rate');
const DiscountInput = document.getElementById('Discount');
const AmountInput = document.getElementById('Amount');
const addButton = document.getElementById('addButton');
const itemTable = document.getElementById('itemTable');
const popupList = document.getElementById('popupList');

let data = [];

fetch('TM2.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
    })
    .catch(error => console.error('Error fetching JSON data:', error));

ItemNameInput.addEventListener('input', () => {
    const inputValue = ItemNameInput.value.toLowerCase();
    popupList.innerHTML = '';
    data.forEach(item => {
        if (item['Item Name'].toLowerCase().includes(inputValue)) {
            const listItem = document.createElement('div');
            listItem.textContent = item['Item Name'];
            listItem.addEventListener('click', () => {
                ItemNameInput.value = item['Item Name'];
                DescriptionInput.value = item['Description'];
                QtyInput.value = item['Qty'];
                RateInput.value = item['Rate'];
                DiscountInput.value = item['Discount'];
                AmountInput.value = item['Amount'];
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

document.addEventListener('click', (e) => {
    if (e.target !== ItemNameInput) {
        popupList.style.display = 'none';
    }
});

addButton.addEventListener('click', () => {
    const newRow = itemTable.insertRow(-1);
    const cells = [
        newRow.insertCell(0),
        newRow.insertCell(1),
        newRow.insertCell(2),
        newRow.insertCell(3),
        newRow.insertCell(4),
        newRow.insertCell(5)
    ];
    cells[0].innerHTML = ItemNameInput.value;
    cells[1].innerHTML = DescriptionInput.value;
    cells[2].innerHTML = QtyInput.value;
    cells[3].innerHTML = RateInput.value;
    cells[4].innerHTML = DiscountInput.value;
    cells[5].innerHTML = AmountInput.value;
    ItemNameInput.value = '';
    DescriptionInput.value = '';
    QtyInput.value = '';
    RateInput.value = '';
    DiscountInput.value = '';
    AmountInput.value = '';
});