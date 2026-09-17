const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".dashboard-section");
const pageTitle = document.getElementById("pageTitle");

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");

const themeButton = document.getElementById("themeButton");
const settingsThemeButton = document.getElementById("settingsThemeButton");

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const notificationButton = document.getElementById("notificationButton");
const notificationToggle = document.getElementById("notificationToggle");

function showSection(sectionName) {

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

    navLinks.forEach(function(link) {
        link.classList.remove("active-nav");
    });

    const selectedLink = document.querySelector(`[data-section="${sectionName}"]`);

    if (selectedLink) {
        selectedLink.classList.add("active-nav");
    }

    const titles = {
        overview: "Overview",
        courses: "Courses",
        assignments: "Assignments",
        schedule: "Schedule",
        grades: "Grades",
        announcements: "Announcements",
        settings: "Settings"
    };

    pageTitle.textContent = titles[sectionName] || "Overview";

    closeMobileSidebar();
}

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const sectionName = this.getAttribute("data-section");

        showSection(sectionName);

    });

});

document.querySelectorAll("[data-section]").forEach(function(button) {

    if (!button.classList.contains("nav-link")) {

        button.addEventListener("click", function() {

            const sectionName = this.getAttribute("data-section");

            showSection(sectionName);

        });

    }

});

function openMobileSidebar() {

    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");

}

function closeMobileSidebar() {

    if (window.innerWidth < 1024) {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
    }

}

openSidebar.addEventListener("click", openMobileSidebar);

closeSidebar.addEventListener("click", closeMobileSidebar);

overlay.addEventListener("click", closeMobileSidebar);

function updateThemeIcon() {

    if (document.documentElement.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

}

function toggleTheme() {

    document.documentElement.classList.toggle("dark");

    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("studentTheme", isDark ? "dark" : "light");

    updateThemeIcon();

}

const savedTheme = localStorage.getItem("studentTheme");

if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
}

updateThemeIcon();

themeButton.addEventListener("click", toggleTheme);

settingsThemeButton.addEventListener("click", toggleTheme);

const searchableItems = [
    {
        name: "Web Development",
        type: "Course",
        section: "courses"
    },
    {
        name: "Database Systems",
        type: "Course",
        section: "courses"
    },
    {
        name: "Software Engineering",
        type: "Course",
        section: "courses"
    },
    {
        name: "Portfolio Website",
        type: "Assignment",
        section: "assignments"
    },
    {
        name: "Database Project",
        type: "Assignment",
        section: "assignments"
    },
    {
        name: "SRS Document",
        type: "Assignment",
        section: "assignments"
    }
];

searchInput.addEventListener("input", function() {

    const searchText = this.value.toLowerCase().trim();

    if (searchText === "") {
        searchResults.classList.add("hidden");
        searchResults.innerHTML = "";
        return;
    }

    const results = searchableItems.filter(function(item) {

        return item.name.toLowerCase().includes(searchText);

    });

    searchResults.classList.remove("hidden");

    if (results.length === 0) {

        searchResults.innerHTML = `
            <p class="text-sm text-slate-500">
                No results found.
            </p>
        `;

        return;
    }

    searchResults.innerHTML = results.map(function(item) {

        return `
            <button
                class="search-result flex w-full items-center justify-between rounded-lg p-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                data-section="${item.section}">

                <span class="font-medium">${item.name}</span>

                <span class="text-xs text-slate-500">
                    ${item.type}
                </span>

            </button>
        `;

    }).join("");

    document.querySelectorAll(".search-result").forEach(function(result) {

        result.addEventListener("click", function() {

            showSection(this.getAttribute("data-section"));

            searchInput.value = "";
            searchResults.classList.add("hidden");

        });

    });

});

notificationButton.addEventListener("click", function() {

    alert("You have 3 new academic notifications.");

});

document.querySelectorAll(".course-button").forEach(function(button) {

    button.addEventListener("click", function() {

        alert("Course details will open here.");

    });

});

let notificationsEnabled = true;

notificationToggle.addEventListener("click", function() {

    notificationsEnabled = !notificationsEnabled;

    const circle = this.querySelector("span");

    if (notificationsEnabled) {

        this.classList.remove("bg-slate-400");
        this.classList.add("bg-indigo-600");

        circle.classList.remove("left-1");
        circle.classList.add("right-1");

    } else {

        this.classList.remove("bg-indigo-600");
        this.classList.add("bg-slate-400");

        circle.classList.remove("right-1");
        circle.classList.add("left-1");

    }

});

const semesterSelect = document.getElementById("semesterSelect");
const performanceLine = document.getElementById("performanceLine");

semesterSelect.addEventListener("change", function() {

    if (this.value === "recent") {

        performanceLine.setAttribute(
            "points",
            "60,145 180,125 300,105 420,85 540,70 660,55"
        );

    } else {

        performanceLine.setAttribute(
            "points",
            "60,170 160,150 260,130 360,110 460,90 560,70 660,55"
        );

    }

});

window.addEventListener("resize", function() {

    if (window.innerWidth >= 1024) {

        sidebar.classList.remove("-translate-x-full");
        overlay.classList.add("hidden");

    } else {

        sidebar.classList.add("-translate-x-full");

    }

});