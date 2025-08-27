
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('studentForm');
  const okBtn = document.getElementById('okBtn');
  const tableBody = document.querySelector('#studentsTable tbody');

  const nameEl = document.getElementById('name');
  const regNoEl = document.getElementById('regNo');
  const phoneEl = document.getElementById('phone');
  const positionEl = document.getElementById('position');
  const yearEl = document.getElementById('year');

  // Helper: get error element for a field id
  const err = (id) => document.querySelector(`.error[data-for="${id}"]`);

  // Keep a running index for the table
  let rowCount = 0;

  // Prevent form submit on Enter (optional but helpful)
  form.addEventListener('submit', (e) => e.preventDefault());

  function clearErrors() {
    ['name','regNo','phone','position','year'].forEach(id => {
      err(id).textContent = '';
    });
  }

  function validateFields() {
    clearErrors();
    let valid = true;

    const name = nameEl.value.trim();
    const regNo = regNoEl.value.trim();
    const phone = phoneEl.value.trim();
    const position = positionEl.value;
    const year = yearEl.value;

    if (name.length < 2) {
      err('name').textContent = 'Please enter a valid name (min 2 characters).';
      valid = false;
    }

    if (!regNo) {
      err('regNo').textContent = 'Register number is required.';
      valid = false;
    }

    if (!/^\d{10}$/.test(phone)) {
      err('phone').textContent = 'Phone must be a 10-digit number.';
      valid = false;
    }

    if (!position) {
      err('position').textContent = 'Select a position.';
      valid = false;
    }

    if (!year) {
      err('year').textContent = 'Select year of study.';
      valid = false;
    }

    return valid ? { name, regNo, phone, position, year } : null;
  }

  function appendRow(data) {
    rowCount += 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rowCount}</td>
      <td>${data.name}</td>
      <td>${data.regNo}</td>
      <td>${data.phone}</td>
      <td>${data.position}</td>
      <td>${data.year}</td>
    `;
    tableBody.appendChild(tr);
  }

  // Main: only on OK click
  okBtn.addEventListener('click', () => {
    const data = validateFields();
    if (!data) return;

    appendRow(data);
    form.reset();
    clearErrors();
    // Optional: move focus back to the first field
    nameEl.focus();
  });

  // Optional UX: clear field-specific error when user edits
  [nameEl, regNoEl, phoneEl, positionEl, yearEl].forEach((el) => {
    el.addEventListener('input', () => {
      const id = el.id === 'regNo' ? 'regNo' : el.id;
      err(id).textContent = '';
    });
  });
});
