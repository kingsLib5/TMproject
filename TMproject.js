 // Example of dynamic styling with JavaScript
 var inputs = document.querySelectorAll('input[type="text"]');
 inputs.forEach(function(input) {
     input.addEventListener('mouseover', function() {
         this.style.backgroundColor = '#f9f9f9'; // Change background color on mouseover
     });
     input.addEventListener('mouseout', function() {
         this.style.backgroundColor = 'transparent'; // Reset background color on mouseout
     });
 });


     // Function to fetch JSON data from "TMproject.json"
     async function fetchJSONData() {
        try {
            const response = await fetch('TMproject.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching JSON data:', error);
        }
    }

    // Function to show the popup list
    async function showPopup(inputKey) {
        var popupList = document.getElementById('popup-list');
        popupList.innerHTML = ''; // Clear previous items

        // Fetch JSON data
        var jsonData = await fetchJSONData();

        // Create and display popup list items
        jsonData.forEach(function(item) {
            var listItem = document.createElement('div');
            listItem.classList.add('popup-item');
            listItem.textContent = item[inputKey];
            listItem.onclick = function() {
                // Fill input fields with selected item
                document.getElementById('balance').value = item['balance'];
                document.getElementById('description').value = item['description'];
                document.getElementById('label').value = item['label'];
                document.getElementById('salePrice').value = item['salePrice'];
                document.getElementById('dealerPrice').value = item['dealerPrice'];
                document.getElementById('costPrice').value = item['costPrice'];
                popupList.style.display = 'none'; // Hide the popup list
            };
            popupList.appendChild(listItem);
        });

        // Position the popup list below the input field
        var inputRect = document.getElementById(inputKey).getBoundingClientRect();
        popupList.style.top = inputRect.bottom + 'px';
        popupList.style.left = inputRect.left + 'px';
        popupList.style.display = 'block'; // Show the popup list
    }

    // Close the popup list when clicking outside
    document.addEventListener('click', function(event) {
        var popupList = document.getElementById('popup-list');
        if (event.target !== popupList && !popupList.contains(event.target)) {
            popupList.style.display = 'none';
        }
    });

    // Filter popup list when input text is typed
    document.addEventListener('input', function(event) {
        var inputId = event.target.id;
        if (inputId === 'balance' || inputId === 'description' || inputId === 'label' || inputId === 'salePrice' || inputId === 'dealerPrice' || inputId === 'costPrice') {
            var inputValue = event.target.value.trim();
            showPopup(inputId, inputValue);
        }
    });