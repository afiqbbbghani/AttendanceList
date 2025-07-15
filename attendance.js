fetch('https://script.google.com/macros/s/AKfycbxVV1cphZY_tGcppd3ngbPz1Tkxr7ny8P01tWp0mShSwb-vMxqySTAtCEev_96Wr4y0/exec')
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("attendance-table");
    table.innerHTML = "";
    data.records.forEach(row => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const td = document.createElement("td");
        td.className = "border-t py-2 px-4";
        td.textContent = cell;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  });
