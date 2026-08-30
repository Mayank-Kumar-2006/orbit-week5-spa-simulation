const app = document.getElementById("app");
const toast = document.getElementById("toast");

const profileButton = document.getElementById("profileButton");
const profileDialog = document.getElementById("profileDialog");
const closeProfile = document.getElementById("closeProfile");
const profileDone = document.getElementById("profileDone");

// =====================================================
// APPLICATION STATE
// =====================================================

const state = {
  search: "",
  notifications: true,
  compactMode: false
};

// =====================================================
// PROJECT DATA
// =====================================================

const projects = [
  {
    id: "taskflow",
    name: "TaskFlow",
    type: "Productivity",
    icon: "T",
    description:
      "A focused task-management workspace with status tracking and quick actions.",
    tags: ["Dashboard", "UI"]
  },

  {
    id: "studio",
    name: "Studio Launch",
    type: "Marketing",
    icon: "S",
    description:
      "A conversion-focused landing experience for a creative studio.",
    tags: ["Landing", "Responsive"]
  },

  {
    id: "smartform",
    name: "Smart Form",
    type: "UX",
    icon: "F",
    description:
      "A form experience designed around clear feedback and low-friction completion.",
    tags: ["Forms", "Accessibility"]
  },

  {
    id: "pulse",
    name: "Pulse Analytics",
    type: "Analytics",
    icon: "P",
    description:
      "A compact analytics dashboard for understanding weekly product activity.",
    tags: ["Charts", "Data"]
  },

  {
    id: "orbit",
    name: "Orbit Mobile",
    type: "Mobile",
    icon: "O",
    description:
      "A mobile-first navigation concept with clear information hierarchy.",
    tags: ["Mobile", "UX"]
  },

  {
    id: "notes",
    name: "Quick Notes",
    type: "Productivity",
    icon: "N",
    description:
      "A minimal note-taking concept focused on speed and discoverability.",
    tags: ["Notes", "UI"]
  }
];

// =====================================================
// ACTIVITY DATA
// =====================================================

const activity = [
  ["✓", "Project TaskFlow was updated", "12 minutes ago"],
  ["+", "New project Studio Launch was created", "48 minutes ago"],
  ["↗", "Weekly report was exported", "2 hours ago"],
  ["★", "You completed the accessibility review", "Yesterday"],
  ["↻", "Workspace settings were updated", "Yesterday"]
];

// =====================================================
// ROUTES
// =====================================================

const routes = {
  "/": renderOverview,
  "/projects": renderProjects,
  "/activity": renderActivity,
  "/settings": renderSettings
};

// =====================================================
// GET CURRENT ROUTE
// =====================================================

function getPath() {
  const raw =
    window.location.hash.replace(/^#/, "") || "/";

  const path = raw.split("?")[0];

  return path === "" ? "/" : path;
}

// =====================================================
// NAVIGATION
// =====================================================

function navigate(path, replace = false) {
  const url = `#${path}`;

  if (replace) {
    history.replaceState(null, "", url);
    render();
  } else {
    history.pushState(null, "", url);
    render();
  }
}

// =====================================================
// MAIN RENDER FUNCTION
// =====================================================

function render() {
  const path = getPath();

  const renderer =
    routes[path] || renderNotFound;

  renderer();

  // Update active navigation link
  document
    .querySelectorAll("[data-route]")
    .forEach((link) => {
      link.classList.toggle(
        "active",
        link.dataset.route === path
      );
    });

  // Start each page at the top
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}

// =====================================================
// OVERVIEW PAGE
// =====================================================

function renderOverview() {
  app.innerHTML = `
    <section class="page">

      <div class="container">

        <div class="page-head">

          <div>

            <p class="eyebrow">
              Monday, August 30
            </p>

            <h1>
              Good evening, Mayank.
            </h1>

            <p class="subtitle">
              Here is a quick snapshot of your workspace.
              Everything updates inside this page without a
              full reload.
            </p>

          </div>

          <a
            class="button button-primary"
            href="#/projects"
          >
            Explore projects →
          </a>

        </div>


        <div class="stats">

          <div class="stat">
            <strong>24</strong>
            <span>Total projects</span>
          </div>

          <div class="stat">
            <strong>18</strong>
            <span>Completed</span>
          </div>

          <div class="stat">
            <strong>76%</strong>
            <span>Completion rate</span>
          </div>

          <div class="stat">
            <strong>4</strong>
            <span>Active projects</span>
          </div>

        </div>


        <div class="dashboard-grid">

          <section class="panel">

            <div class="panel-head">

              <div>

                <h2>
                  Project progress
                </h2>

                <p>
                  Current work across your active projects.
                </p>

              </div>

              <span class="label">
                Live
              </span>

            </div>


            <div class="progress-row">

              <div class="progress-meta">

                <span>
                  TaskFlow Dashboard
                </span>

                <span>
                  82%
                </span>

              </div>

              <div class="progress">
                <i style="--value:82%"></i>
              </div>

            </div>


            <div class="progress-row">

              <div class="progress-meta">

                <span>
                  Studio Launch
                </span>

                <span>
                  64%
                </span>

              </div>

              <div class="progress">
                <i style="--value:64%"></i>
              </div>

            </div>


            <div class="progress-row">

              <div class="progress-meta">

                <span>
                  Smart Form
                </span>

                <span>
                  91%
                </span>

              </div>

              <div class="progress">
                <i style="--value:91%"></i>
              </div>

            </div>


            <div class="progress-row">

              <div class="progress-meta">

                <span>
                  Pulse Analytics
                </span>

                <span>
                  43%
                </span>

              </div>

              <div class="progress">
                <i style="--value:43%"></i>
              </div>

            </div>

          </section>


          <aside class="panel">

            <div class="panel-head">

              <div>

                <h2>
                  Recent activity
                </h2>

                <p>
                  Your latest workspace events.
                </p>

              </div>

            </div>


            <div class="mini-list">

              ${activity
                .slice(0, 4)
                .map(
                  (item) => `
                    <div class="mini-item">

                      <strong>
                        ${item[1]}
                      </strong>

                      <span>
                        ${item[2]}
                      </span>

                    </div>
                  `
                )
                .join("")}

            </div>

          </aside>

        </div>

      </div>

    </section>
  `;
}

// =====================================================
// PROJECTS PAGE
// =====================================================

function renderProjects() {
  app.innerHTML = `
    <section class="page">

      <div class="container">

        <div class="page-head">

          <div>

            <p class="eyebrow">
              Workspace
            </p>

            <h1>
              Projects
            </h1>

            <p class="subtitle">
              Search projects instantly. The URL stays on
              the same SPA route while the content changes
              dynamically.
            </p>

          </div>


          <button
            class="button button-primary"
            id="newProject"
            type="button"
          >
            + New project
          </button>

        </div>


        <div class="toolbar">

          <input
            class="search"
            id="projectSearch"
            type="search"
            placeholder="Search projects..."
            aria-label="Search projects"
            value="${escapeHtml(state.search)}"
          >

          <span
            id="projectCount"
            class="label"
          ></span>

        </div>


        <div
          class="project-grid"
          id="projectGrid"
        ></div>

      </div>

    </section>
  `;

  const search =
    document.getElementById("projectSearch");

  const grid =
    document.getElementById("projectGrid");

  const count =
    document.getElementById("projectCount");


  // -----------------------------------------------
  // DISPLAY PROJECTS
  // -----------------------------------------------

  function paintProjects() {
    const query =
      state.search
        .toLowerCase()
        .trim();

    const matches =
      projects.filter((project) => {

        const searchableText =
          `
            ${project.name}
            ${project.type}
            ${project.description}
            ${project.tags.join(" ")}
          `.toLowerCase();

        return searchableText.includes(query);

      });


    count.textContent =
      `${matches.length} result${
        matches.length === 1 ? "" : "s"
      }`;


    if (matches.length === 0) {

      grid.innerHTML = `
        <div
          class="panel"
          style="grid-column:1/-1;text-align:center"
        >
          No projects match
          “${escapeHtml(state.search)}”.
        </div>
      `;

      return;
    }


    grid.innerHTML =
      matches
        .map(
          (project) => `
            <article class="project-card">

              <div
                class="project-icon"
                aria-hidden="true"
              >
                ${project.icon}
              </div>


              <p class="label">
                ${project.type}
              </p>


              <h3>
                ${project.name}
              </h3>


              <p>
                ${project.description}
              </p>


              <div class="tags">

                ${project.tags
                  .map(
                    (tag) => `
                      <span class="tag">
                        ${tag}
                      </span>
                    `
                  )
                  .join("")}

              </div>


              <button
                class="button button-secondary project-open"
                data-id="${project.id}"
                type="button"
              >
                Open project
              </button>

            </article>
          `
        )
        .join("");


    // Add events to project buttons
    grid
      .querySelectorAll(".project-open")
      .forEach((button) => {

        button.addEventListener(
          "click",
          () => {

            const project =
              projects.find(
                (item) =>
                  item.id === button.dataset.id
              );

            if (!project) return;

            showToast(
              `${project.name} selected`
            );

          }
        );

      });
  }


  // -----------------------------------------------
  // SEARCH EVENT
  // -----------------------------------------------

  search.addEventListener(
    "input",
    (event) => {

      state.search =
        event.target.value;

      paintProjects();

    }
  );


  // -----------------------------------------------
  // NEW PROJECT BUTTON
  // -----------------------------------------------

  document
    .getElementById("newProject")
    .addEventListener(
      "click",
      () => {

        showToast(
          "Demo action: project creation would open here."
        );

      }
    );


  // Initial project rendering
  paintProjects();

  // Automatically focus search field
  search.focus();
}

// =====================================================
// ACTIVITY PAGE
// =====================================================

function renderActivity() {

  app.innerHTML = `
    <section class="page">

      <div class="container">

        <div class="page-head">

          <div>

            <p class="eyebrow">
              Timeline
            </p>

            <h1>
              Activity
            </h1>

            <p class="subtitle">
              A client-side activity view rendered into
              the same application shell.
            </p>

          </div>


          <button
            class="button button-secondary"
            id="clearActivity"
            type="button"
          >
            Mark all read
          </button>

        </div>


        <div class="activity-list">

          ${activity
            .map(
              (item) => `
                <article class="activity-item">

                  <div
                    class="activity-icon"
                    aria-hidden="true"
                  >
                    ${item[0]}
                  </div>


                  <div>

                    <strong>
                      ${item[1]}
                    </strong>

                    <span>
                      Workspace event
                    </span>

                  </div>


                  <span class="activity-time">
                    ${item[2]}
                  </span>

                </article>
              `
            )
            .join("")}

        </div>

      </div>

    </section>
  `;


  document
    .getElementById("clearActivity")
    .addEventListener(
      "click",
      () => {

        showToast(
          "All activity marked as read."
        );

      }
    );
}

// =====================================================
// SETTINGS PAGE
// =====================================================

function renderSettings() {

  app.innerHTML = `
    <section class="page">

      <div class="container">

        <div class="page-head">

          <div>

            <p class="eyebrow">
              Preferences
            </p>

            <h1>
              Settings
            </h1>

            <p class="subtitle">
              These controls demonstrate client-side
              state management without leaving the SPA.
            </p>

          </div>

        </div>


        <div class="settings-grid">

          <div class="settings-card">

            <div class="setting-row">

              <div>

                <h3>
                  Email notifications
                </h3>

                <p>
                  Receive updates about workspace activity.
                </p>

              </div>


              <label class="switch">

                <input
                  id="notifications"
                  type="checkbox"
                  ${
                    state.notifications
                      ? "checked"
                      : ""
                  }
                >

                <span class="slider"></span>

              </label>

            </div>

          </div>


          <div class="settings-card">

            <div class="setting-row">

              <div>

                <h3>
                  Compact dashboard
                </h3>

                <p>
                  Use a denser layout for dashboard cards.
                </p>

              </div>


              <label class="switch">

                <input
                  id="compactMode"
                  type="checkbox"
                  ${
                    state.compactMode
                      ? "checked"
                      : ""
                  }
                >

                <span class="slider"></span>

              </label>

            </div>

          </div>


          <div class="settings-card">

            <h3>
              Routing
            </h3>

            <p style="color:var(--muted)">

              Current route:
              <strong>
                ${getPath()}
              </strong>.

              Browser back/forward buttons are
              supported through the History API.

            </p>

          </div>

        </div>

      </div>

    </section>
  `;


  // -----------------------------------------------
  // NOTIFICATIONS SETTING
  // -----------------------------------------------

  document
    .getElementById("notifications")
    .addEventListener(
      "change",
      (event) => {

        state.notifications =
          event.target.checked;

        showToast(
          `Notifications ${
            state.notifications
              ? "enabled"
              : "disabled"
          }.`
        );

      }
    );


  // -----------------------------------------------
  // COMPACT MODE SETTING
  // -----------------------------------------------

  document
    .getElementById("compactMode")
    .addEventListener(
      "change",
      (event) => {

        state.compactMode =
          event.target.checked;

        document.body.dataset.compact =
          String(state.compactMode);

        showToast(
          `Compact mode ${
            state.compactMode
              ? "enabled"
              : "disabled"
          }.`
        );

      }
    );
}

// =====================================================
// 404 PAGE
// =====================================================

function renderNotFound() {

  app.innerHTML = `
    <section class="page not-found">

      <div class="container">

        <p class="eyebrow">
          404
        </p>

        <h1>
          Page not found.
        </h1>

        <p>
          The SPA could not match
          <strong>
            ${escapeHtml(getPath())}
          </strong>
          to a registered route.
        </p>

        <a
          class="button button-primary"
          href="#/"
        >
          Return to overview
        </a>

      </div>

    </section>
  `;
}

// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHtml(value) {

  return String(value).replace(
    /[&<>"']/g,
    (character) => {

      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return entities[character];

    }
  );
}

// =====================================================
// TOAST NOTIFICATION
// =====================================================

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2400);
}

// =====================================================
// PROFILE DIALOG
// =====================================================

profileButton.addEventListener(
  "click",
  () => {

    profileDialog.showModal();

  }
);


closeProfile.addEventListener(
  "click",
  () => {

    profileDialog.close();

  }
);


profileDone.addEventListener(
  "click",
  () => {

    profileDialog.close();

  }
);


// Close dialog when clicking outside
profileDialog.addEventListener(
  "click",
  (event) => {

    if (
      event.target === profileDialog
    ) {

      profileDialog.close();

    }

  }
);

// =====================================================
// ROUTE EVENTS
// =====================================================

window.addEventListener(
  "hashchange",
  render
);

window.addEventListener(
  "popstate",
  render
);

// =====================================================
// NAVIGATION LINK HANDLING
// =====================================================

document.addEventListener(
  "click",
  (event) => {

    const link =
      event.target.closest(
        "a[data-route]"
      );

    if (!link) return;

    const href =
      link.getAttribute("href");

    if (
      href &&
      href.startsWith("#/")
    ) {

      event.preventDefault();

      navigate(
        href.slice(1)
      );

    }

  }
);

// =====================================================
// INITIALIZE APPLICATION
// =====================================================

if (!window.location.hash) {

  navigate("/", true);

} else {

  render();

}
