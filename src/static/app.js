document.addEventListener("DOMContentLoaded", () => {
  const activities = [
    { id: 1, name: "Basketball", participants: ["Alice", "Bob"] },
    { id: 2, name: "Drama Club", participants: ["Charlie", "Dana"] },
    { id: 3, name: "Chess Club", participants: ["Eve", "Frank"] },
  ];

  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  // Populate activities list
  activitiesList.innerHTML = ""; // Clear the loading message

  activities.forEach((activity) => {
    const activityCard = document.createElement("div");
    activityCard.className = "activity-card";

    activityCard.innerHTML = `
      <h4>${activity.name}</h4>
      <div class="participants">
        <h5>Participants:</h5>
        <ul>
          ${activity.participants.map((participant) => `<li>${participant}</li>`).join("")}
        </ul>
      </div>
    `;

    activitiesList.appendChild(activityCard);

    // Add option to select dropdown
    const option = document.createElement("option");
    option.value = activity.name;
    option.textContent = activity.name;
    activitySelect.appendChild(option);
  });

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = result.message;
        messageDiv.className = "success";
        signupForm.reset();
      } else {
        messageDiv.textContent = result.detail || "An error occurred";
        messageDiv.className = "error";
      }

      messageDiv.classList.remove("hidden");

      // Hide message after 5 seconds
      setTimeout(() => {
        messageDiv.classList.add("hidden");
      }, 5000);
    } catch (error) {
      messageDiv.textContent = "Failed to sign up. Please try again.";
      messageDiv.className = "error";
      messageDiv.classList.remove("hidden");
      console.error("Error signing up:", error);
    }
  });
});
