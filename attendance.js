fetch('YOUR_WEB_APP_VIEW_URL')
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