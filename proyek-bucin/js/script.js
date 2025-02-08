document.addEventListener('DOMContentLoaded', function() {
    // Simulasi data kenangan
    let data = [
        { name: 'Pertama Kali Bertemu', email: 'Saat itu langit begitu cerah...' },
        { name: 'Tangisan Bahagia', email: 'Ketika kamu pertama kali mengatakan "I Love You"...' }
    ];

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username.toLowerCase() === 'sampean' && password === 'cintaku') {
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('errorMessage').textContent = 'Nama atau kata sandi cinta salah. Coba lagi!';
            }
        });
    }

    // CRUD Operations
    const crudForm = document.getElementById('crudForm');
    if (crudForm) {
        crudForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            data.push({ name, email });
            renderTable();
            crudForm.reset();
        });
    }

    // Render Table
    function renderTable(page = 1) {
        const tableBody = document.querySelector('#dataTable tbody');
        if (tableBody) {
            tableBody.innerHTML = '';
            const itemsPerPage = 5;
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedData = data.slice(start, end);
            paginatedData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>
                        <button onclick="editItem(${start + index})">Edit</button>
                        <button onclick="deleteItem(${start + index})">Hapus</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            renderPagination();
        }
    }

    // Render Pagination
    function renderPagination() {
        const paginationDiv = document.getElementById('pagination');
        if (paginationDiv) {
            paginationDiv.innerHTML = '';
            const totalPages = Math.ceil(data.length / 5);
            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.addEventListener('click', function() {
                    renderTable(i);
                });
                paginationDiv.appendChild(button);
            }
        }
    }

    // Edit Item
    window.editItem = function(index) {
        const item = data[index];
        document.getElementById('name').value = item.name;
        document.getElementById('email').value = item.email;
        data.splice(index, 1);
        renderTable();
    };

    // Delete Item
    window.deleteItem = function(index) {
        data.splice(index, 1);
        renderTable();
    };

    // Export to PDF
    const exportButton = document.getElementById('exportButton');
    if (exportButton) {
        exportButton.addEventListener('click', function() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.setFontSize(18);
            doc.text('Kenangan Indah Kita', 10, 10);
            doc.setFontSize(12);
            let y = 20;
            data.forEach(item => {
                doc.text(`Judul: ${item.name}`, 10, y);
                doc.text(`Deskripsi: ${item.email}`, 10, y + 10);
                y += 20;
            });
            doc.save('kenangan_kita.pdf');
        });
    }

    // Initial Render
    renderTable();
});