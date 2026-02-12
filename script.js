let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("applicationForm");
const table = document.getElementById("applicationsTable");

const totalEl = document.getElementById("total");
const interviewsEl = document.getElementById("interviews");
const offersEl = document.getElementById("offers");
const rejectionsEl = document.getElementById("rejections");

// Load data on page load
displayApplications();
updateSummary();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const application = {
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        stage: document.getElementById("stage").value,
        result: document.getElementById("result").value,
        date: document.getElementById("date").value
    };

    applications.push(application);
    localStorage.setItem("applications", JSON.stringify(applications));

    form.reset();
    displayApplications();
    updateSummary();
});

function displayApplications() {
    table.innerHTML = "";

    applications.forEach((app, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteApplication(${index})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

function deleteApplication(index) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    displayApplications();
    updateSummary();
}

function updateSummary() {
    totalEl.textContent = applications.length;

    interviewsEl.textContent = applications.filter(
        app => app.stage === "Interview"
    ).length;

    offersEl.textContent = applications.filter(
        app => app.stage === "Offer"
    ).length;

    rejectionsEl.textContent = applications.filter(
        app => app.result === "Rejected" || app.stage === "Rejected"
    ).length;
}
