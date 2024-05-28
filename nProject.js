function addToList() {
    var inputs = document.querySelectorAll('table input, table select');
    var values = Array.from(inputs).map(function(input) {
        return input.value;
    });
    
    var list = document.getElementById('list');
    var listItem = document.createElement('li');
    listItem.textContent = values.join(' | ');
    list.appendChild(listItem);
}

function showAddModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
}

function hideModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}

function editRow(button) {
    var row = button.parentNode.parentNode;
    var modal = document.getElementById('editModal');
    var modalContent = modal.querySelector('.modal-content');

    // Populate inputs with current values
    document.getElementById('editCustomer').value = row.cells[0].textContent;
    document.getElementById('editEmail').value = row.cells[1].textContent;
    document.getElementById('editPhone').value = row.cells[2].textContent;
    document.getElementById('editJoiningDate').value = row.cells[3].textContent;
    document.getElementById('editDeliveryStatus').value = row.cells[4].textContent;

    // Remove existing save button if any
    var existingSaveButton = modalContent.querySelector('.save-button');
    if (existingSaveButton) {
        existingSaveButton.remove();
    }

    // Attach save button event listener
    var saveButton = document.createElement('button');
    saveButton.textContent = "Save";
    saveButton.className = "save-button"; // Add class for identification
    saveButton.onclick = function() {
        saveEditedRow(row);
    };

    // Add the new save button
    modalContent.appendChild(saveButton);

    // Show the edit modal
    modal.style.display = "block";
}

function saveEditedRow(row) {
    var customer = document.getElementById('editCustomer').value;
    var email = document.getElementById('editEmail').value;
    var phone = document.getElementById('editPhone').value;
    var joiningDate = document.getElementById('editJoiningDate').value;
    var deliveryStatus = document.getElementById('editDeliveryStatus').value;

    // Update table cell values
    row.cells[0].textContent = customer;
    row.cells[1].textContent = email;
    row.cells[2].textContent = phone;
    row.cells[3].textContent = joiningDate;
    row.cells[4].textContent = deliveryStatus;

    var modal = document.getElementById('editModal');
    modal.style.display = "none";
}

function cancelEdit() {
    var modal = document.getElementById('editModal');
    modal.style.display = "none";
}

function insertRow() {
    var customer = document.getElementById('customer').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var joiningDate = document.getElementById('joiningDate').value;
    var deliveryStatus = document.getElementById('deliveryStatus').value;
    var action = document.getElementById('action').value;
    
    var table = document.querySelector('table');
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    
    cell1.innerHTML = '<input type="text" name="customer' + rowCount + '" value="' + customer + '" disabled>';
    cell2.innerHTML = '<input type="email" name="email' + rowCount + '" value="' + email + '" disabled>';
    cell3.innerHTML = '<input type="text" name="phone' + rowCount + '" value="' + phone + '" disabled>';
    cell4.innerHTML = '<input type="date" name="joiningDate' + rowCount + '" value="' + joiningDate + '" disabled>';
    cell5.innerHTML = '<select name="deliveryStatus' + rowCount + '" disabled><option value="Delivered">Delivered</option><option value="Pending">Pending</option></select>';
    cell6.innerHTML = '<span>' + action + '</span><button onclick="editRow(this)">Edit</button><button onclick="removeRow(this)">Remove</button>';
    
    hideModal();
}

function removeRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}